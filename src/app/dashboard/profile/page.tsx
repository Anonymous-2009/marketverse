'use client';

import { useUser } from '@clerk/nextjs';
import Profile from './Profile';
import { ProfileSkeleton } from '@/components/custom/skeleton/Profile-Skeleton';

export default function ProfilePage() {
  const { user, isLoaded  } = useUser();

  if(isLoaded) {
    return <Profile email={user?.primaryEmailAddress?.emailAddress}/>
  }

  return (
    <div>
    <ProfileSkeleton />
    </div>
  );
}
