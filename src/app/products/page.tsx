import Image from "next/image";
import { company } from "@/config/company";
import Link from "next/link";

export default function ProductsPage() {
  const categories = company.categories;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <h1 className="text-3xl font-semibold">Products</h1>
      <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-300">
        Explore our range of Animal Feed, Chicken Feed, and Cattle Feed.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.name}
            href={`/products/${c.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800"
          >
            <div className="relative aspect-[4/3]">
              <Image src={c.image} alt={c.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium">{c.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


