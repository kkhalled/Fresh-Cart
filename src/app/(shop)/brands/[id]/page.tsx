import BrandDetailsScreen from "@/src/features/brands/screens/BrandDetails.screen";

interface BrandDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { id } = await params;
  return <BrandDetailsScreen brandId={id} />;
}
