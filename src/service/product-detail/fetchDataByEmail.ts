import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from './fetchData';

export const useFetchProducts = () => {
  return useQuery({
    queryKey: ['products-buyer'],
    queryFn: async () => {
      return await fetchProducts(); // Ensure this is an async function
    },
    staleTime: 5 * 60 * 1000,
    // cacheTime: 30 * 60 * 1000,
    // select: (data) => data.data, // This will extract the data array from the response
  });
};
