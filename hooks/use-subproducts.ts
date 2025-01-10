import { useQuery } from "@tanstack/react-query";

interface Image {
  id: string;
  url: string;
  key: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
}

interface Price {
  value: string;
  label: string;
  price: string;
}

interface Subproduct {
  id: string;
  name: string;
  stock: number;
  perunitprice: number; // Base price for 100g
  prices: Price[];
  inStock: boolean;
  featured: boolean;
  discount: number | null;
  image: Image[];
  review: Review[];
  productId: string;
}

interface StandardPrice {
  price: string;
  label: string;
  isCalculated: boolean;
  originalPrice?: {
    price: string;
    label: string;
  };
}

interface Category {
  id: string;
  name: string;
  image: Image[];
  Subproduct?: Subproduct[];
}


const getStandardPriceForSubproduct = (subproduct: Subproduct): StandardPrice => {
  const hasVariant = (weight: number) => 
    subproduct.prices.some(p => 
      p.label.toLowerCase().includes(weight.toString()) && 
      p.label.toLowerCase().includes("gram")
    );

  const getVariant = (weight: number) =>
    subproduct.prices.find(p => 
      p.label.toLowerCase().includes(weight.toString()) && 
      p.label.toLowerCase().includes("gram")
    );

  // First check if 250g variant exists
  if (hasVariant(250)) {
    const variant250g = getVariant(250);
    return {
      price: variant250g!.price,
      label: variant250g!.label,
      isCalculated: false
    };
  }

  // If no 250g, check if 100g variant exists
  if (hasVariant(100)) {
    const variant100g = getVariant(100);
    return {
      price: variant100g!.price,
      label: variant100g!.label,
      isCalculated: false
    };
  }

  // If no 100g variant but perunitprice exists, use perunitprice exactly as is
  if (subproduct.perunitprice) {
    return {
      // Convert to string without any rounding or precision loss
      price: subproduct.perunitprice.toString(),
      label: "100 grams",
      isCalculated: false
    };
  }

  // If no 250g or 100g, check for 500g
  if (hasVariant(500)) {
    const variant500g = getVariant(500);
    return {
      price: variant500g!.price,
      label: variant500g!.label,
      isCalculated: false
    };
  }

  // Fallback to first available price if nothing else matches
  if (subproduct.prices.length > 0) {
    return {
      price: subproduct.prices[0].price,
      label: subproduct.prices[0].label,
      isCalculated: false
    };
  }

  // Ultimate fallback to perunitprice
  return {
    price: subproduct.perunitprice.toString(),
    label: "100 grams",
    isCalculated: false
  };
};

const fetchSubproducts = async (): Promise<Subproduct[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/subproducts`
  );
  return response.json();
};

const fetchSubproductById = async (subproductId: string): Promise<Subproduct> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/subproducts/${subproductId}`
  );
  return response.json();
};

export const useSubproducts = () => {
  const { data: subproducts, ...rest } = useQuery({
    queryKey: ["subproducts"],
    queryFn: fetchSubproducts,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  const standardVariants = subproducts?.map(subproduct => ({
    ...subproduct,
    standardPrice: getStandardPriceForSubproduct(subproduct)
  }));

  return {
    subproducts,
    standardVariants,
    isLoading: !subproducts,
    error: rest.error,
  };
};



export const useSubproduct = (subproductId: string) => {
  const { data: subproduct, ...rest } = useQuery({
    queryKey: ["subproduct", subproductId],
    queryFn: () => fetchSubproductById(subproductId),
    staleTime: 1000 * 60 * 5,
    enabled: !!subproductId,
  });

  const standardPrice = subproduct ? getStandardPriceForSubproduct(subproduct) : null;

  return {
    subproduct: subproduct ? { ...subproduct, standardPrice } : null,
    isLoading: rest.isLoading,
    error: rest.error,
  };
};

export const useFeaturedSubproducts = () => {
  const { standardVariants, ...rest } = useSubproducts();
  
  const featuredSubproducts = standardVariants?.filter(
    (subproduct) => subproduct.featured
  );

  return { 
    data: featuredSubproducts, 
    ...rest 
  };
};

export const useSubproductVariants = (subproductId: string) => {
  const { subproduct, isLoading } = useSubproduct(subproductId);

  const getVariantPrices = () => subproduct?.prices || [];

  return {
    getVariantPrices,
    standardPrice: subproduct?.standardPrice,
    isLoading,
    subproduct,
  };
};

export default useSubproducts;