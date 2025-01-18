'use client';
import { useUser } from '@clerk/nextjs';
import { useFetchDataByEmail } from '@/app/service/detail/fetchDataByEmail';

const UserDetails = () => {
  // const { user } = useUser();
  const email = 'krishnabag751@gmail.com';
  const { data, isLoading, isError, error } = useFetchDataByEmail(email);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(data);
  // console.log(data.data)
  return (
    <div>
      {/* <h1>User Details</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {data.data.map((user:any) => (
        <>
          <div key={user.id} className=" rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-center mb-4">
              <img
                src={user.profileImageUrl}
                alt={`${user.username}'s profile`}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span>{' '}
                  {user.phoneNo || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Age:</span> {user.age || 'N/A'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Gender:</span>{' '}
                  {user.gender || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Created:</span>{' '}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Updated:</span>{' '}
                  {new Date(user.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default UserDetails;
