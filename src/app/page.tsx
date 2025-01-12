'use client';
import { useAuth } from '@clerk/nextjs';
import React from 'react';

const Home = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in</div>;

  console.log(isSignedIn);
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        heelo
      </div>
    </>
  );
};

export default Home;
