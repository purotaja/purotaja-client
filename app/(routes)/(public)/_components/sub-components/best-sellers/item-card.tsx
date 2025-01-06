import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from 'next/link';

// Types
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

interface StandardVariant {
  id: string;
  name: string;
  standardPrice: Price;
  image: Image[];
  inStock: boolean;
  featured: boolean;
  discount: number | null;
}

interface ItemCardProps {
  subproduct: StandardVariant;
}

const ItemCard = ({ subproduct }: ItemCardProps) => {
  const {
    id,
    name,
    image,
    standardPrice,
    discount
  } = subproduct;

  // Safe discount value (0 if null)
  const discountValue = discount ?? 0;

  return (
    <Link href={`/category/subproducts/${id}`} className="cursor-pointer">
      <Card className="px-5 py-5 items-center rounded-xl shadow-sm justify-center flex flex-col md:gap-2 w-full">
        <div className="w-full md:h-[30vh] h-[24vh] 2xl:h-[25vh] flex items-center justify-center overflow-hidden rounded-xl">
          <Image
            src={image[0]?.url || "/bata.png"}
            alt={name}
            height={250}
            width={250}
            className="shrink-0 rounded-xl"
          />
        </div>
        <div className="flex flex-col w-full">
          <h1 className="text-customBlack text-xl font-normal">{name}</h1>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">
                {discountValue > 0 ? (
                  <span className="text-sm font-medium text-red-500 mr-2">
                    -{discountValue}%
                  </span>
                ) : (
                  <span className="text-sm font-medium text-red-500 mr-2">
                    -0%
                  </span>
                )}
                ₹{standardPrice.price}/<span className="text-sm text-black/70">250gm</span>
              </h1>
              {discountValue > 0 ? (
                <h2 className="text-xs line-through">
                  M.R.P: ₹{standardPrice.price}/250gm
                </h2>
              ) : (
                <h2 className="text-xs">M.R.P: ₹{standardPrice.price}/250gm</h2>
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