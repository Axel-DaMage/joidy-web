import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FooterVersion } from "@/components/FooterVersion";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      <div className="flex-1 w-full max-w-7xl mx-auto pt-24 px-6 md:px-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative min-h-[calc(100vh-14rem)]">
          <DocsSidebar />

          {/* Main Content */}
          <main id="main-content" className="flex-1 min-w-0 pb-16">
            {children}
          </main>
        </div>
      </div>

      <Footer version={<FooterVersion />} />
    </div>
  );
}
