import Image from "next/image";
import { getAllCategories, getProductBySlugs } from "@/lib/products";

export function generateStaticParams() {
  const params: { category: string; id: string }[] = [];
  for (const c of getAllCategories()) {
    for (const p of c.products) {
      params.push({ category: c.slug, id: p.id });
    }
  }
  return params;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  const product = getProductBySlugs(category, id);
  if (!product)
    return <div className="mx-auto max-w-3xl px-6 py-12">Product not found.</div>;
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold">{product.name}</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
        Category: {product.category}
      </p>
      <div className="mt-6 rounded-lg border border-neutral-200 p-4 text-sm dark:border-neutral-800">
        This is a placeholder description. We will add specifications and packaging details from your catalog.
      </div>
    </div>
  );
}


