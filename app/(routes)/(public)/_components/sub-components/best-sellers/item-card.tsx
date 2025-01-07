import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Image {
  id: string;
  url: string;
  key: string;
}

interface Price {
  value: string;
  label: string;
  price: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
}

interface Subproduct {
  id: string;
  name: string;
  stock: number;
  perunitprice: number;
  prices: Price[];
  inStock: boolean;
  featured: boolean;
  discount: number | null;
  image: Image[];
  review: Review[];
  productId: string;
  standardPrice: {
    price: string;
    label: string;
    isCalculated: boolean;
    originalPrice?: {
      price: string;
      label: string;
    };
  };
}

interface ItemCardProps {
  subproduct: Subproduct;
}

const ItemCard = ({ subproduct }: ItemCardProps) => {
  const router = useRouter();

  const originalPrice = parseFloat(subproduct.standardPrice.price);
  
  const discountedPrice = (subproduct.discount ?? 0) > 0
    ? originalPrice - (originalPrice * (subproduct.discount! / 100))
    : originalPrice;

  const formatPrice = (price: number) => Math.round(price * 100) / 100;


  return (
    <Link
      href={`/category/subproducts/${subproduct.id}`}
      className="cursor-pointer"
    >
      <Card className="px-5 py-5 items-center rounded-xl shadow-sm justify-center flex flex-col md:gap-2 w-full">
        <div className="w-full md:h-[30vh] h-[24vh] 2xl:h-[25vh] flex items-center justify-center overflow-hidden rounded-xl">
          <Image
            src={subproduct.image[0]?.url || "/bata.png"}
            alt={subproduct.name}
            height={250}
            width={250}
            className="shrink-0 rounded-xl"
          />
        </div>
        <div className="flex flex-col w-full">
          <h1 className="text-customBlack text-xl font-normal">
            {subproduct.name}
          </h1>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">
                {(subproduct.discount ?? 0) > 0 ? (
                  <span className="text-sm font-medium text-red-500 mr-2">
                    -{subproduct.discount}%
                  </span>
                ) : null}
                ₹{formatPrice(discountedPrice)}/
                <span className="text-sm text-black/70">
                  {subproduct.standardPrice.label}
                </span>
              </h1>
              {(subproduct.discount ?? 0) > 0 ? (
                <h2 className="text-xs line-through">
                  M.R.P: ₹{formatPrice(originalPrice)}/{subproduct.standardPrice.label}
                </h2>
              ) : (
                <h2 className="text-xs">
                  M.R.P: ₹{formatPrice(originalPrice)}/{subproduct.standardPrice.label}
                </h2>
              )}
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                className="px-8 md:px-4 border border-violet hover:bg-violet hover:text-white text-violet"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ItemCard;