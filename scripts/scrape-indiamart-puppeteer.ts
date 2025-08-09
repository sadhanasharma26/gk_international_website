/*
  Headless scrape of IndiaMART products using Puppeteer.
  Usage: ts-node scripts/scrape-indiamart-puppeteer.ts <url>
*/
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

type Product = { id: string; name: string; image: string; category: string };
type Category = { name: string; slug: string; products: Product[] };

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function main() {
  const url =
    process.argv[2] ||
    "https://www.indiamart.com/gkinternationalkanpur/products-and-services.html";

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36"
  );
  await page.goto(url, { waitUntil: "networkidle2", timeout: 90_000 });

  // Try to expand lazy areas by scrolling
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let y = 0;
      const step = () => {
        window.scrollTo(0, y);
        y += 800;
        if (y < document.body.scrollHeight + 1000) setTimeout(step, 200);
        else resolve();
      };
      step();
    });
  });
  await new Promise((r) => setTimeout(r, 1500));

  const items = await page.evaluate(() => {
    const MIN_IMG_WIDTH = 120;
    function textFor(el: Element): string {
      const t = (el.getAttribute("alt") || el.getAttribute("title") || "").trim();
      const parentText = el.parentElement?.textContent?.trim() || "";
      const sibText = el.nextElementSibling?.textContent?.trim() || "";
      const name = [t, parentText, sibText].find((s) => s && s.length > 3) || "";
      return name.replace(/\s+/g, " ").trim();
    }

    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
    const products: { name: string; image: string }[] = [];
    for (const img of imgs) {
      const width = img.naturalWidth || Number(img.getAttribute("width")) || 0;
      const srcRaw = img.getAttribute("data-src") || img.getAttribute("src") || "";
      if (!srcRaw || width < MIN_IMG_WIDTH) continue;
      const src = srcRaw.startsWith("http") ? srcRaw : `https:${srcRaw}`;
      const name = textFor(img);
      if (!name || name.length > 120) continue;
      products.push({ name, image: src });
    }
    return products;
  });

  await browser.close();

  // Heuristics to keep only feed items and dedupe
  const FEED_REGEX = /(cattle|chicken|poultry|animal)\s*feed/i;
  const dedup = new Map<string, Product>();
  const inferCategory = (name: string) => {
    const l = name.toLowerCase();
    if (l.includes("cattle")) return "Cattle Feed";
    if (l.includes("chicken") || l.includes("poultry")) return "Chicken Feed";
    if (l.includes("animal")) return "Animal Feed";
    return "Other";
  };

  for (const item of items) {
    const name = item.name.replace(/\s{2,}/g, " ").trim();
    if (!FEED_REGEX.test(name)) continue;
    const id = slugify(name);
    if (!dedup.has(id)) {
      dedup.set(id, { id, name, image: item.image, category: inferCategory(name) });
    }
  }

  const cats: Record<string, Category> = {};
  for (const p of dedup.values()) {
    const key = slugify(p.category);
    if (!cats[key]) cats[key] = { name: p.category, slug: key, products: [] };
    cats[key].products.push(p);
  }

  const outDir = path.join(process.cwd(), "src", "data");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "products.json");
  fs.writeFileSync(outPath, JSON.stringify({ categories: Object.values(cats) }, null, 2));
  console.log(`Wrote ${outPath} with ${dedup.size} products in ${Object.keys(cats).length} categories`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


