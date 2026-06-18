import Image from "next/image";
import Link from "next/link";
import { SiteHeader, TopBanner } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import BestSellerCard from "@/components/home/best-seller-card";
import { ProcessSteps } from "@/components/process-steps";
import ScrollToCategories from "@/components/home/scroll-to-categories";
import HeroLogo from "@/components/home/hero-logo";
import { bestSellers, categories, logos } from "@/lib/home-content";

export default function Home() {
  return (
    <main className="min-h-dvh bg-[#111111] text-[#F0F0F0]">
      <TopBanner />
      <SiteHeader />

      <section className="relative overflow-hidden">
        <Image src="/images/home/DESKTOP_HERO_BG.png" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative mx-auto min-h-[560px] max-w-7xl px-6 pt-0 pb-0 lg:py-20 flex items-center justify-between gap-4 lg:gap-10">
          <div className="w-full text-center lg:max-w-2xl lg:text-left">
            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl sm:leading-[0.95] lg:text-5xl xl:text-7xl">
              Order custom
              <br />
              embroidered hats.
            </h1>

            <p className="mx-auto mt-8 max-w-lg rounded-2xl bg-black/40 px-4 py-3 text-lg font-medium text-white/90 lg:mx-0 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0">
              Premium embroidered hats for brands, teams, and businesses, structured truckers, rope hats, snapbacks, flex fits, and more. Every hat is digitized and stitched in-house.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link href="/hats" className="rounded-full bg-gradient-to-b from-[#7AB3D4] to-[#1E5A8C] px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:scale-105 hover:from-[#5B9BD5] hover:to-[#0C2340]">
                Shop Hats
              </Link>
              <ScrollToCategories />
            </div>

            <div className="mt-6 flex items-center justify-center gap-0 rounded-2xl bg-black/40 px-5 py-3 lg:hidden">
              <div className="text-center">
                <p className="text-xl font-extrabold text-white">680+</p>
                <p className="text-xs text-white/60">Happy customers</p>
              </div>
              <div className="mx-5 h-8 w-px bg-white/30" />
              <div className="text-center">
                <p className="text-xl font-extrabold text-white">5/5</p>
                <p className="text-xs text-white/60">Average review score</p>
              </div>
            </div>

            <div className="mt-10 hidden gap-10 text-white lg:flex">
              <div>
                <p className="text-3xl font-extrabold">500+</p>
                <p className="text-sm text-white/80">Orders completed</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">5/5</p>
                <p className="text-sm text-white/80">Customer experience</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block shrink-0">
            <HeroLogo />
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-14">
        <h2 className="text-center text-4xl font-extrabold tracking-tight">Shop by Hat Style</h2>
        <div className="mt-8 mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-[#EBE7E1] p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-12">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="group flex flex-col items-center justify-center rounded-2xl p-3 text-center transition duration-300 sm:p-4">
                <div className="transition duration-300 group-hover:scale-110">
                  {category.image ? (
                    <div className="relative h-28 w-28 sm:h-48 sm:w-48">
                      <Image src={category.image} alt={category.name} fill className="object-contain drop-shadow-lg" />
                    </div>
                  ) : (
                    <span className="text-5xl">{category.icon}</span>
                  )}
                </div>
                <span className="mt-3 text-base font-bold text-[#111111] transition duration-300 group-hover:text-[#4A90C4] sm:mt-4 sm:text-2xl">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-center text-4xl font-extrabold tracking-tight">Most Popular Hat Styles</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6">
          {bestSellers.map((item) => (
            <BestSellerCard key={item.title} title={item.title} image={item.image} href={item.href} imageScale={item.imageScale} />
          ))}
        </div>
      </section>

      <ProcessSteps />

      <section className="bg-[#161616] py-16">
        <div className="mx-auto max-w-7xl overflow-hidden px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.45em] text-[#A8B4BC]">
            Trusted by brands big and small
          </p>
          <div className="mt-10 overflow-hidden">
            <div className="brand-track flex min-w-max items-center gap-6 md:gap-12 lg:gap-16">
              {[...logos, ...logos].map((logo, index) => (
                <div key={`${logo.name}-${index}`} className="flex h-10 w-36 shrink-0 items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#222222] px-4 md:h-12 md:w-44">
                  <span className="text-xs font-semibold text-[#A8B4BC]/60">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-[2rem] border border-[#4A90C4] bg-[#222222] p-6 sm:p-10 text-center shadow-sm">
            <h3 className="text-2xl sm:text-4xl font-extrabold">Have any questions for us?</h3>
            <Link href="/contact" className="mt-6 inline-flex rounded-full bg-gradient-to-b from-[#7AB3D4] to-[#1E5A8C] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:from-[#5B9BD5] hover:to-[#0C2340]">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
