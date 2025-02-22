'use client';

import ProductGridSkeleton from '@/components/custom/skeleton/Products-Skeleton';
import ProductGrid from '@/components/custom/products/ProductGrid';
import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect } from 'react';

const Home = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const addBuyer = async () => {
        try {
          const data = {
            userId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            imageURL: user.imageUrl,
          };

          const response = await axios.post('/api/user/add-user', data);
          console.log('API Response:', response.data);
        } catch (error) {
          console.error('Error adding user:', error);
        }
      };

      addBuyer();
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) return <ProductGridSkeleton />;
  if (!isSignedIn) return <div>Please sign in</div>;

  return <ProductGrid />;
};

export default Home;
