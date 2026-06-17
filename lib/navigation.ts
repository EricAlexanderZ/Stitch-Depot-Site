import { categories } from "@/lib/home-content";

const bgs = ["bg-[#eef2f7]", "bg-[#f3f6fb]", "bg-[#f5f5f5]", "bg-[#f8f4ee]"];

export const productLinks = categories.map((cat, i) => ({
  name: cat.name,
  href: cat.href,
  image: cat.image ?? "",
  bg: bgs[i] ?? "bg-[#f5f5f5]",
}));
