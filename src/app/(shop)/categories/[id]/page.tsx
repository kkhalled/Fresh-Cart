
import CategoryDetailScreen from "@/src/features/categories/screens/CategoryDetail.screen";

interface CategoryPageProps {
  params: {
    id: string;
  };
}



export default async  function SpecificCategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  return <CategoryDetailScreen categoryId={id} />;
}
