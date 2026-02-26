import ProductDetailsPage from "@/src/features/products/components/singleProduct/ProductDetailsPage";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}
export default async function ProductDetailPage({params }: ProductDetailPageProps) {
  const { id } = await params;
  return <ProductDetailsPage id={id} />;
}
