import { useQuery } from '@tanstack/react-query';
import { fetchDataByEmailForBuyer } from './fetchData';

export const useFetchDataByEmailForBuyer = (email: string | undefined) => {
  return useQuery({
    queryKey: ['details-buyer', email],
    queryFn: async () => {
      if (!email) return null;
      return await fetchDataByEmailForBuyer(email); // Ensure this is an async function
    },
    enabled: !!email,
    staleTime: 5 * 60 * 1000,
    // cacheTime: 30 * 60 * 1000,
    // select: (data) => data.data, // This will extract the data array from the response
  });
};
