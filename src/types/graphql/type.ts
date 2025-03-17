import { Address } from '../schema/interface';

// Define the type for GraphQL response
export interface AddressQueryResponse {
  addressesByEmail: Address[];
}

// TypeScript interface for address input
export interface AddressInput {
  email: string;
  isDefault?: boolean;
  country: string;
  fullName: string;
  streetName?: string;
  city: string;
  state: string;
  pincode: string;
  phoneNo: string;
  addressID?: number;
}
