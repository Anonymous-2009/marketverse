'use client';
import { useUser } from '@clerk/nextjs';
import { ProductList } from './product-list';
import ProductGridSkeleton from '@/components/custom/skeleton/Products-List';

export default function Home() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <ProductGridSkeleton />;
  }

  return (
    <main className="bg-auto min-h-screen py-8">
      <ProductList email={user?.primaryEmailAddress?.emailAddress || ''} />
    </main>
  );
}
