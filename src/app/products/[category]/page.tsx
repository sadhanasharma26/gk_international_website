import Image from "next/image";
import Link from "next/link";
import { getAllCategories, getCategoryBySlug } from "@/lib/products";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return <div className="mx-auto max-w-7xl px-6 py-12">Category not found.</div>;
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <h1 className="text-3xl font-semibold">{category.name}</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${category.slug}/${p.id}`}
            className="group overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800"
          >
            <div className="relative aspect-[4/3]">
              <Image src={p.image} alt={p.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium">{p.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


