import Navbar from "@/src/components/shared/Navbar";
import Footer from "@/src/components/shared/Footer";
import PageTransition from "@/src/components/layout/PageTransition";
import NavigationBar from "@/src/components/shared/NavigationBar";
import Breadcrumb from "@/src/components/shared/Breadcrumb";
import getAllCategories from "@/src/features/categories/server/category.action";
import { ApiCategoryItem } from "@/src/features/categories/types/category.type";

const allowedSlugs = ["electronics", "women's-fashion", "men's-fashion", "beauty-and-health"];

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let navCategories: ApiCategoryItem[] = [];
  try {
    const res = await getAllCategories();
    navCategories = res.data.filter((c) => allowedSlugs.includes(c.slug));
  } catch {
    // degrade gracefully — nav still works without categories
  }

  return (
    <>
      <Navbar />
      <NavigationBar initialCategories={navCategories} />
      <Breadcrumb />
      
      <main className="bg-gray-50 min-h-screen">
        <PageTransition>
          <div className="mx-auto">{children}</div>
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}

