'use client';

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

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in</div>;

  return (
    <div className="h-screen w-full flex justify-center items-center">
      Hello
    </div>
  );
};

export default Home;
