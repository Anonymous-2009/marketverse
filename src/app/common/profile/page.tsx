'use client';

import React from 'react';
import { ProfileSkeleton } from '@/components/custom/skeleton/Profile-Skeleton';
import { useUser } from '@clerk/nextjs';
import Main from './main';

export default function Page() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <ProfileSkeleton />;
  }

  return <Main email={user?.emailAddresses[0].emailAddress || ''} />;
}
