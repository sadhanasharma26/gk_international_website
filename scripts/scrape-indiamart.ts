/*
  Minimal scraper for IndiaMART products page to build products.json
  Usage: ts-node scripts/scrape-indiamart.ts <url>
*/
import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";
import fetch from "node-fetch";

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
  const url = process.argv[2] || "https://www.indiamart.com/gkinternationalkanpur/products-and-services.html";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  const html = await res.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // IndiaMART structure can vary; we attempt a generic parse of product blocks
  const cards = Array.from(doc.querySelectorAll("a, div")) as Element[];
  const products: Product[] = [];

  for (const el of cards) {
    const text = el.textContent?.trim() || "";
    const imgEl = el.querySelector("img");
    const imgSrc = imgEl?.getAttribute("data-src") || imgEl?.getAttribute("src") || "";
    if (text && imgSrc && text.length < 120) {
      products.push({
        id: slugify(text),
        name: text,
        image: imgSrc.startsWith("http") ? imgSrc : `https:${imgSrc}`,
        category: "Uncategorized",
      });
    }
  }

  // Group by simple keywords
  const categories: Record<string, Category> = {};
  const inferCategory = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("cattle")) return "Cattle Feed";
    if (lower.includes("chicken") || lower.includes("poultry")) return "Chicken Feed";
    if (lower.includes("animal")) return "Animal Feed";
    return "Other";
  };

  for (const p of products) {
    const catName = inferCategory(p.name);
    const key = slugify(catName);
    if (!categories[key]) categories[key] = { name: catName, slug: key, products: [] };
    categories[key].products.push({ ...p, category: catName });
  }

  const outDir = path.join(process.cwd(), "src", "data");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "products.json");
  fs.writeFileSync(outPath, JSON.stringify({ categories: Object.values(categories) }, null, 2));
  console.log(`Wrote ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


