'use client';

import { useFetchProducts } from '@/service/product-detail/fetchDataByEmail';
import ProductComponent from './List';
import ProductGridSkeleton from '@/components/custom/skeleton/Products-List';

const ProductList = () => {
  const { data, isLoading, isError, error } = useFetchProducts();

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return <div> error occur </div>;
  }

  const products = data?.product;

  return (
    <main className="py-16">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <ProductComponent products={data?.product || []} />
    </main>
  );
};

export default ProductList;
