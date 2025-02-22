'use client';

import { useFetchProducts } from '@/service/product-detail/fetchDataByEmail';
import ProductRow from './ProductRow';
import ProductGridSkeleton from '../skeleton/Products-Skeleton';

const ProductGrid = () => {
  const { data, isLoading, isError, error } = useFetchProducts();

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return <div> error occur </div>;
  }

  const products = data?.product;
  // Split products into sections
  const newArrivals = products.slice(0, 10);
  const bestSellers = products.slice(10, 20);
  const specialOffers = products.slice(20);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-4xl font-bold mb-16 text-center">
        Discover Our Products
      </h2>
      <div className="space-y-20">
        {/* First row */}
        <ProductRow title="New Arrivals" products={newArrivals} />

        {/* Second row - only show if first row has products */}
        {newArrivals.length > 0 && bestSellers.length > 0 && (
          <ProductRow title="Best Sellers" products={bestSellers} />
        )}

        {/* Third row - only show if first and second rows have products */}
        {newArrivals.length > 0 &&
          bestSellers.length > 0 &&
          specialOffers.length > 0 && (
            <ProductRow title="Special Offers" products={specialOffers} />
          )}
      </div>
    </div>
  );
};

export default ProductGrid;
