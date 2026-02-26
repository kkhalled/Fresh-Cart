import { getProductsDetails } from "../../server/products.action";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";
    
export default async function ProductDetailsPage({ id }: { id: string }) {

    const response = await getProductsDetails(id)
  // Static images - replace with actual product images from API/props
  const productImages = response.data.images || [];      
  
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Left Section - Gallery (35%) */}
          <div className="lg:w-[35%]">
            <ProductGallery images={productImages} />
          </div>

          {/* Right Section - Product Info (65%) */}
          <div className="lg:w-[65%]">
            <ProductInfo product={response} />
          </div>
        </div>

        {/* Product Tabs Section */}
        <div className="mt-10">
          <ProductTabs product={response.data} />
        </div>

        {/* Related Products Section */}
        <div className="mt-10">
          <RelatedProducts 
            categoryId={response.data.category._id} 
            currentProductId={response.data._id} 
          />
        </div>
      </div>
    </div>
  );
}
