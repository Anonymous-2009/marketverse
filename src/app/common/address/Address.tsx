import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AddAddressDialog } from './Dialog';
import AddressCard from './Card';

interface AddressProps {
  email: string;
}

interface Address {
  id: number;
  email: string;
  addressID: number;
  isDefault: boolean;
  country: string;
  fullName: string;
  streetName: string;
  city: string;
  state: string;
  pincode: number;
  phoneNo: string;
  createdAt: string;
  updatedAt: string;
}

const Address: React.FC<AddressProps> = ({ email }) => {
  // console.log(email)

  const [addresses, setAddress] = useState<Address[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/user/address-user/${email}`);
        setAddress(response.data.address);
        // console.log(response.data.address)
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch account data.',
        });
      }
    };

    if (email) getData();
  }, [email, toast]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Addresses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AddAddressDialog email={email} />

        {/* Address Cards */}
        {addresses.map((address) => (
          <AddressCard key={address.id} {...address} />
        ))}
      </div>
    </div>
  );
};

export default Address;
