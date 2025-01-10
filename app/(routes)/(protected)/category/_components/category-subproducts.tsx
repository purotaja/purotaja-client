import React, { useState, useMemo } from "react";
import { useSubproducts, useSubproductVariants } from "@/hooks/use-subproducts";
import { useCategory } from "@/hooks/use-category";
import { Button } from "@/components/ui/button";
import CategorySubproductCard from "./category-subproduct-card";
import { ArrowDownUp, SlidersHorizontal, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySubproductsProps {
  selectedCategoryId: string | null;
}

const CategorySubproducts: React.FC<CategorySubproductsProps> = ({
  selectedCategoryId,
}) => {
  const { standardVariants, isLoading } = useSubproducts();
  const { products } = useCategory(selectedCategoryId || "");
  const [selectedSubproduct, setSelectedSubproduct] = useState<any>(null);
  const [filters, setFilters] = useState({
    priceRange: "",
    productFilter: "all"
  });

  const categoryProducts = useMemo(() => 
    products?.filter(product => product.categoryId === selectedCategoryId) || [],
    [products, selectedCategoryId]
  );

  const uniqueProductNames = useMemo(() => 
    Array.from(new Set(categoryProducts.map(p => p.name))).sort(),
    [categoryProducts]
  );

  const { getVariantPrices } = useSubproductVariants(selectedSubproduct?.id || "");
  const variants = selectedSubproduct ? getVariantPrices() : [];

  const filteredSubproducts = useMemo(() => {
    if (!standardVariants || selectedSubproduct) return [];

    let filtered = standardVariants;

    if (selectedCategoryId) {
      filtered = filtered.filter(subproduct =>
        categoryProducts.some(product => product.id === subproduct.productId)
      );
    }

    if (filters.productFilter !== "all") {
      const selectedProduct = categoryProducts.find(
        p => p.name.toLowerCase() === filters.productFilter.toLowerCase()
      );
      if (selectedProduct) {
        filtered = filtered.filter(s => s.productId === selectedProduct.id);
      }
    }

    if (filters.priceRange) {
      const getPriceValue = (subproduct: any) => 
        parseFloat(subproduct.standardPrice.price);

      filtered = filtered.filter(s => {
        const price = getPriceValue(s);
        switch (filters.priceRange) {
          case "0": return price >= 100 && price <= 300;
          case "300": return price > 300 && price <= 600;
          case "600": return price > 600 && price <= 1000;
          case "1000": return price > 1000;
          default: return true;
        }
      });
    }

    return filtered;
  }, [standardVariants, selectedCategoryId, categoryProducts, filters, selectedSubproduct]);

  const handleViewVariants = (subproduct: any) => {
    setSelectedSubproduct(subproduct);
  };

  const handleBackToProducts = () => {
    setSelectedSubproduct(null);
  };

  const handleAddToCart = (variant: any) => {
    // Implement your add to cart logic here
    console.log("Adding to cart:", variant);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-10 items-center">
      <div className="flex gap-5 w-full items-start">
        {!selectedSubproduct ? (
          <>
            <Select 
              value={filters.productFilter}
              onValueChange={(value) => setFilters(prev => ({ ...prev, productFilter: value }))}
            >
              <SelectTrigger className="flex items-center gap-2 cursor-pointer w-auto text-violet">
                <SlidersHorizontal className="w-5 h-5" />
                <SelectValue placeholder="Filter by Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Products</SelectLabel>
                  <SelectItem value="all">All Products</SelectItem>
                  <div className="max-h-[18vh] overflow-y-auto">
                    {uniqueProductNames.map((name) => (
                      <SelectItem key={name} value={name.toLowerCase()}>
                        {name}
                      </SelectItem>
                    ))}
                  </div>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select 
              value={filters.priceRange}
              onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
            >
              <SelectTrigger className="flex items-center gap-2 cursor-pointer w-auto text-violet">
                <ArrowDownUp className="w-5 h-5 text-violet" />
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Price Range</SelectLabel>
                  <SelectItem value="0">100 - 300</SelectItem>
                  <SelectItem value="300">300 - 600</SelectItem>
                  <SelectItem value="600">600 - 1000</SelectItem>
                  <SelectItem value="1000">more than 1000</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        ) : (
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={handleBackToProducts}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}
      </div>

      {selectedSubproduct ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:max-h-[500px] overflow-y-auto scroll-smooth">
          {variants.map((variant) => (
            <CategorySubproductCard
              key={variant.label}
              subproduct={{
                ...selectedSubproduct,
                standardPrice: {
                  price: variant.price,
                  label: variant.label
                }
              }}
              isVariant={true}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:max-h-[500px] overflow-y-auto scroll-smooth">
          {filteredSubproducts.length === 0 ? (
            <div className="w-full h-[400px] flex flex-col items-center justify-center font-medium text-xl gap-5 col-span-3">
              No subproducts available
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-violet" />
            </div>
          ) : (
            filteredSubproducts.map((subproduct) => (
              <CategorySubproductCard
                key={subproduct.id}
                subproduct={subproduct}
                onViewVariants={handleViewVariants}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySubproducts;