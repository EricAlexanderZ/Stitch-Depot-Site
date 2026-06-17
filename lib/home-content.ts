type Category = {
  name: string;
  href: string;
  icon?: string;
  image?: string;
};

export const categories: Category[] = [
  { name: "OTTO Mid Profile",   href: "/hats", image: "/images/home/OTTO%20Mid%20Profile%20Hats/Natural_Crown_Black_Bill_Front-01.png" },
  { name: "Performance Rope",   href: "/hats", image: "/images/home/Rope%20Hats/Black_Hat_White%26Black_Rope_Front-01.png" },
  { name: "Flex Fit 110s",      href: "/hats", image: "/images/home/Flex%20Fit/110_Brown_%26_Khaki_Front-01.png" },
];

export const bestSellers = [
  { title: "OTTO Mid Profile Hats",  image: "/images/home/OTTO%20Mid%20Profile%20Hats/Natural_Crown_Black_Bill_Front-01.png",              href: "/hats", imageScale: "scale-[0.9]" },
  { title: "Performance Rope Hats",  image: "/images/home/Rope%20Hats/Black_Hat_White%26Black_Rope_Front-01.png",      href: "/hats", imageScale: "scale-[1.1]" },
  { title: "Flex Fit 110s",          image: "/images/home/Flex%20Fit/110_Brown_%26_Khaki_Front-01.png",                href: "/hats", imageScale: "scale-[0.9]" },
];

export const processSteps = [
  { image: "/images/home/UPLOAD-04.png",    step: 1, title: "Upload your artwork",  description: "Send us your logo, design, or concept and we will prepare it for embroidery." },
  { image: "/images/home/DESKTOP-03b.png",   step: 2, title: "Review and Approve",   description: "We send a proof, make any needed adjustments, and get approval before production begins." },
  { image: "/images/home/BOX-02.png",       step: 3, title: "Receive your Order",   description: "We stitch, pack, and ship your order with a clean turnaround and premium finish." },
];

export const logos = [
  { name: "Your Brand Here" },
  { name: "Your Brand Here" },
  { name: "Your Brand Here" },
  { name: "Your Brand Here" },
  { name: "Your Brand Here" },
  { name: "Your Brand Here" },
];
