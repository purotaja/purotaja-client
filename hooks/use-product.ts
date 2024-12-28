import { useEffect, useState } from 'react';
import { Product } from '@/types';

interface ProductsResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  };
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/products`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: ProductsResponse = await response.json();

        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
};

export default useProducts;