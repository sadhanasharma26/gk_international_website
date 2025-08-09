import Image from "next/image";
import Link from "next/link";
import { company } from "@/config/company";

export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {company.name}
              </h1>
              <p className="mt-6 text-base/7 text-neutral-600 dark:text-neutral-300">
                Established {company.establishedYear} • {company.city}, {company.state}
                <br />
                {company.description}
              </p>
              <div className="mt-10 flex items-center gap-4">
                <Link
                  href="/products"
                  className="rounded-md btn-primary px-5 py-2.5 text-sm font-medium"
                >
                  Explore Products
                </Link>
                <Link
                  href="/contact"
                  className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
              <Image
                src="/hero-placeholder.jpg"
                alt="GK International products"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-neutral-50 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {company.keyFactors.map((factor) => (
              <div
                key={factor}
                className="rounded-lg border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <h3 className="text-sm font-semibold">{factor}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Featured Categories</h2>
            <Link href="/products" className="text-sm underline">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {company.categories.map((c) => (
                <div
                  key={c.name}
                  className="group overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium">{c.name}</h3>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
