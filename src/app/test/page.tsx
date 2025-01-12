'use client';
import { useUser, useAuth } from '@clerk/nextjs';


const UserDetails = () => {
  const { user } = useUser();
  
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
       <h1>User Details</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre> 
    </div>
  );
};

export default UserDetails;
