import { useQuery } from '@tanstack/react-query';
import { fetchDataByEmail } from './fetchData';

export const useFetchDataByEmail = (email: string | undefined) => {
  return useQuery({
    queryKey: ['details', email],
    queryFn: async () => {
      if (!email) return null;
      return await fetchDataByEmail(email); // Ensure this is an async function
    },
    enabled: !!email,
    staleTime: 5 * 60 * 1000,
    // cacheTime: 30 * 60 * 1000,
    // select: (data) => data.data, // This will extract the data array from the response
  });
};
