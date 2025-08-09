import baseData from "@/data/products.json" assert { type: "json" };

export type Product = {
  id: string;
  name: string;
  image: string;
  category: string;
};

export type Category = {
  name: string;
  slug: string;
  products: Product[];
};

export type Catalog = {
  categories: Category[];
};

const catalog: Catalog = baseData as Catalog;

export function getAllCategories(): Category[] {
  return catalog.categories || [];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find((c) => c.slug === slug);
}

export function getProductBySlugs(categorySlug: string, productId: string): Product | undefined {
  const cat = getCategoryBySlug(categorySlug);
  return cat?.products.find((p) => p.id === productId);
}


