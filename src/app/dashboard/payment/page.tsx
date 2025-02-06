'use client';

import { useUser } from '@clerk/nextjs';
import ProfileSkelCreateProductSkeleton from '@/components/custom/skeleton/List-Skeleton';
import Main from './main';

export default function Page() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <ProfileSkelCreateProductSkeleton />;
  }

  return (
    <div className="container mx-auto py-10">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center ">
          Account Information
        </h1>
        <Main
          email={user?.primaryEmailAddress?.emailAddress}
          sellerId={user?.id}
        />
      </main>
    </div>
  );
}
