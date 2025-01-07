import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Image {
  id: string;
  url: string;
  key: string;
}

interface StandardPrice {
  price: string;
  label: string;
}

interface CategorySubproductCardProps {
  subproduct: {
    id: string;
    name: string;
    image: Image[];
    discount: number | null;
    standardPrice: StandardPrice;
    perunitprice: number;
  };
}

const CategorySubproductCard = ({ subproduct }: CategorySubproductCardProps) => {
  const { id, name, image, standardPrice, discount } = subproduct;
  const productUrl = `/category/subproducts/${id}`;
  const displayDiscount = discount ?? 0;


  const originalPrice = parseFloat(subproduct.standardPrice.price);
  
  const discountedPrice = (subproduct.discount ?? 0) > 0
    ? originalPrice - (originalPrice * (subproduct.discount! / 100))
    : originalPrice;

  const formatPrice = (price: number) => Math.round(price * 100) / 100;

  return (
    <Card className="px-5 py-4 items-center rounded-xl shadow-sm justify-center flex flex-col md:gap-2 w-full">
      <div className="w-full h-[23vh] md:h-[27vh] 2xl:h-[25vh] flex items-center justify-center overflow-hidden">
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
              {displayDiscount > 0 ? (
                <span className="text-sm font-medium text-red-500 mr-2">
                  -{displayDiscount}%
                </span>
              ) : (
                <span className="text-sm font-medium text-red-500 mr-2">
                  -0%
                </span>
              )}
              ₹{formatPrice(discountedPrice)}/<span className="text-xs">{standardPrice.label}</span>
            </h1>
            <h2 className="text-xs line-through">
              M.R.P: ₹ {formatPrice(originalPrice)}/{standardPrice.label}
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <Link href={productUrl}>
              <Button variant={"outline"} className="2xl:px-8 md:px-5 px-10 border-violet text-violet">
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategorySubproductCard;