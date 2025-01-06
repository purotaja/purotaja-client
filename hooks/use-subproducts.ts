import { useEffect, useState } from 'react';

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
  perunitprice: number;
  prices: Price[];
  discount: number | null;
  inStock: boolean;
  featured: boolean;
  image: Image[];
  review: Review[];
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

interface UseSubproductsReturn {
  subproducts: Subproduct[];
  standardVariants: StandardVariant[];
  getVariantsById: (id: string) => Price[] | undefined;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useSubproducts = (): UseSubproductsReturn => {
  const [subproducts, setSubproducts] = useState<Subproduct[]>([]);
  const [standardVariants, setStandardVariants] = useState<StandardVariant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubproducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/subproducts`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch subproducts');
      }

      const data: Subproduct[] = await response.json();
      
      // Store full subproducts data
      setSubproducts(data);

      // Process and store standard variants (250g)
      const standardVariantsData = data.map(product => {
        const standardPrice = product.prices.find(price => 
          price.label === "250 grams"
        ) || product.prices[0]; // Fallback to first price if 250g not found

        return {
          id: product.id,
          name: product.name,
          standardPrice,
          image: product.image,
          inStock: product.inStock,
          featured: product.featured,
          discount: product.discount
        };
      });

      setStandardVariants(standardVariantsData);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      console.error('Error fetching subproducts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get all variants for a specific product by ID
  const getVariantsById = (id: string): Price[] | undefined => {
    const product = subproducts.find(p => p.id === id);
    return product?.prices;
  };

  useEffect(() => {
    fetchSubproducts();
  }, []);

  return { 
    subproducts, 
    standardVariants, 
    getVariantsById,
    isLoading, 
    error,
    refetch: fetchSubproducts 
  };
};

export default useSubproducts;