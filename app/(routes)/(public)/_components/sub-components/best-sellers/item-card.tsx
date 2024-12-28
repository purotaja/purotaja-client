import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types";
import Image from "next/image";
import useCart from '@/hooks/use-cart';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ItemCardProps {
  product: Product;
}

const ItemCard = ({ product }: ItemCardProps) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const cart = useCart();
  const [quantity, setQuantity] = useState<number>(0);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  const {
    id,
    name,
    image,
    price,
    discount = 0,
    stock
  } = product;

  const discountedPrice = price - (price * discount) / 100;

  useEffect(() => {
    const cartQty = cart.getItemQuantity(id);
    setQuantity(cartQty);
    setIsInCart(cartQty > 0);
  }, [cart, id]);

  const addItem = () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to add items to cart");
      router.push("/sign-in");
      return;
    } else {
      if (quantity >= stock) {
        toast.error("Cannot add more than available stock");
        return;
      }
      const newQuantity = quantity + 1;
      cart.addItem(product, newQuantity);
      setQuantity(newQuantity);
      setIsInCart(true);
      router.push(`/category/products/${id}`);
    }
  };

  return (
    <Link key={id} href={`/category/products/${id}`} className='cursor-pointer'>
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
              {discount > 0 ? (
                <span className="text-sm font-medium text-red-500 mr-2">
                  -{discount}%
                </span>
              ) : (
                <span className="text-sm font-medium text-red-500 mr-2">
                  -0%
                </span>
              )}
              {discountedPrice.toFixed(2)}<span className='text-sm'>/Kg</span>
            </h1>
            <h2 className="text-xs line-through">M.R.P: {price}/kg</h2>
          </div>
          <div className="flex items-center">
            <Button
              onClick={addItem}
              variant={isInCart ? "secondary" : "outline"}
              className={`border px-10 md:px-6 ${
                isInCart 
                  ? "text-white cursor-not-allowed bg-violet"
                  : "border-violet text-violet hover:bg-violet hover:text-white"
              }`}
              disabled={isInCart || quantity >= stock}
            >
              {isInCart ? "Added" : "ADD"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
    </Link>
  );
};

export default ItemCard;