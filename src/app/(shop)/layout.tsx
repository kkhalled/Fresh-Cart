import Navbar from "@/src/components/shared/Navbar";
import Footer from "@/src/components/shared/Footer";
import PageTransition from "@/src/components/layout/PageTransition";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <PageTransition>
          <div className="mx-auto">{children}</div>
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}

