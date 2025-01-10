import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Price {
  price: string;
  label: string;
}

interface SubproductImage {
  id: string;
  url: string;
  key: string;
}

interface CategorySubproductCardProps {
  subproduct: {
    id: string;
    name: string;
    image: SubproductImage[];
    standardPrice: Price;
    discount: number | null;
  };
  isVariant?: boolean;
  onViewVariants?: (subproduct: any) => void;
  onAddToCart?: (subproduct: any) => void;
}

const CategorySubproductCard = ({ 
  subproduct, 
  isVariant = false,
  onViewVariants,
  onAddToCart 
}: CategorySubproductCardProps) => {
  const router = useRouter();
  const { id, name, image, standardPrice, discount } = subproduct;
  const displayDiscount = discount ?? 0;

  const originalPrice = parseFloat(standardPrice.price);
  const discountedPrice = (displayDiscount > 0)
    ? originalPrice - (originalPrice * (displayDiscount / 100))
    : originalPrice;

  const formatPrice = (price: number) => Math.round(price * 100) / 100;

  const handleAddToCart = (subproduct: any) => {
    router.push(`/category/subproducts/${subproduct.id}`);
  };

  return (
    <Card className="px-5 py-4 items-center rounded-xl shadow-sm justify-center flex flex-col md:gap-2 w-full">
      <div className="w-full h-[23vh] md:h-[27vh] 2xl:h-[25vh] flex items-center justify-center rounded-xl overflow-hidden">
        <Image
          src={image[0]?.url || "/placeholder.png"}
          alt={name}
          height={170}
          width={170}
          className="shrink-0 rounded-xl hidden md:flex"
        />
        <Image
          src={image[0]?.url || "/placeholder.png"}
          alt={name}
          height={250}
          width={250}
          className="shrink-0 rounded-xl md:hidden"
        />
      </div>
      <div className="flex flex-col w-full">
        <h1 className="text-customBlack text-xl font-normal">{name}</h1>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-semibold">
              {displayDiscount > 0 && (
                <span className="text-sm font-medium text-red-500 mr-2">
                  -{displayDiscount}%
                </span>
              )}
              ₹{formatPrice(discountedPrice)}/<span className="text-xs">{standardPrice.label}</span>
            </h1>
            <h2 className="text-xs line-through">
              M.R.P: ₹ {formatPrice(originalPrice)}/{standardPrice.label}
            </h2>
          </div>
          <div className="flex items-center justify-center">
            {isVariant ? (
              <Button 
                variant="outline" 
                className="border-violet text-violet"
                onClick={() => handleAddToCart(subproduct)}
              >
                Add
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="2xl:px-8 md:px-5 px-10 border-violet text-violet"
                onClick={() => onViewVariants?.(subproduct)}
              >
                View
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategorySubproductCard;