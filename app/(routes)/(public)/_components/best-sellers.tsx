import ItemCard from "./sub-components/best-sellers/item-card";
import CustomSwiper from "@/components/shared/swiper";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useSubproducts from "@/hooks/use-subproducts";

const BestSellersSkeleton = () => (
  <>
    <div className="w-full md:flex gap-5 hidden">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="px-5 py-4 rounded-xl shadow-sm w-full">
          <div className="space-y-4">
            <Skeleton className="w-full h-[180px] rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </Card>
      ))}
    </div>
    <div className="w-full flex gap-5 md:hidden">
      <Card className="px-5 py-4 rounded-xl shadow-sm w-full">
        <div className="space-y-4">
          <Skeleton className="w-full h-[180px] rounded-lg" />
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-2 w-full" />
            </div>
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </Card>
    </div>
  </>
);

const BestSellers = () => {
  const { subproducts, standardVariants, isLoading, error } = useSubproducts();

  // If there's an error or no data, return null
  if (error || (!isLoading && (!subproducts || subproducts.length === 0))) {
    return null;
  }

  return (
    <section className="w-full max-w-screen-2xl h-auto px-5 md:px-14 flex items-center flex-col mx-auto gap-10 mt-10">
      <div className="w-full md:text-start text-center">
        <h1 className="text-3xl text-customBlack font-medium select-none">
          Best Sellers
        </h1>
      </div>
      
      {isLoading ? (
        <BestSellersSkeleton />
      ) : (
          <div className="w-full">
            <CustomSwiper>
              {standardVariants.map((item) => (
                <ItemCard key={item.id} subproduct={item} />
              ))}
            </CustomSwiper>
          </div>
        )}
    </section>
  );
};

export default BestSellers;