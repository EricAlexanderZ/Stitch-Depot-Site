import { SiteHeader } from "@/components/site-header";

export default function TestPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        <p>Test page</p>
      </main>
    </>
  );
}
