// import { useQuery } from '@tanstack/react-query';
// import { updateData } from './update';

// export const useFetchDataByEmail = (email: string | undefined) => {
//   return useQuery({
//     queryKey: ['details', email],
//     queryFn: () => updateData(email),
//     enabled: !!email,
//     staleTime: 5 * 60 * 1000,
//     //   cacheTime: 30 * 60 * 1000,
//     //   select: (data) => data.data, // This will extract the data array from the response
//   });
// };
