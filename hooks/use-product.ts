import { useQuery } from '@tanstack/react-query';

interface Image {
  id: string;
  url: string;
  key: string;
}

interface Category {
  id: string;
  name: string;
}

interface Subproduct {
  id: string;
  name: string;
  stock: number;
  perunitprice: number;
  prices: {
    value: string;
    label: string;
    price: string;
  }[];
  inStock: boolean;
  featured: boolean;
  discount: number | null;
  image: Image[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: Image[];
  category: Category;
  subproduct: Subproduct[];
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/products`
  );
  const data = await response.json();
  return data.products;
};

const fetchProductById = async (productId: string): Promise<Product> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/products/${productId}`
  );
  const data = await response.json();
  return data.product;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    staleTime: 1000 * 60 * 5,
    enabled: !!productId,
  });
};

// Utility hook for filtering products by category
export const useFilteredProducts = (categoryId?: string) => {
  const { data: products, ...rest } = useProducts();

  const filteredProducts = products?.filter(
    product => !categoryId || product.category.id === categoryId
  );

  return { data: filteredProducts, ...rest };
};