import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { addressSchema, type AddressFormValues } from '@/validation';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import type { ApiResponseCommon, Address } from '@/types';

const AddressCard = (address: Address) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: address.country,
      fullName: address.fullName,
      streetName: address.streetName ?? '',
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      phoneNo: address.phoneNo,
      isDefault: address.isDefault,
      email: address.email,
      addressID: address.addressID,
    },
  });

  const onSubmit: SubmitHandler<AddressFormValues> = async (
    data: AddressFormValues
  ): Promise<void> => {
    // console.log(data);
    try {
      const response = await axios.put<ApiResponseCommon>(
        '/api/user/address-user',
        data
      );
      // console.log(response);
      toast({
        title: 'Message',
        description: response.data.message,
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }
  };

  async function handleRemove(id: number): Promise<void> {
    try {
      const response = await axios.delete<ApiResponseCommon>(
        `/api/user/address-user`,
        {
          data: { id },
        }
      );
      toast({
        title: 'Message',
        description: response.data.message,
      });
    } catch (error) {
      console.error('Error deleting address:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }
  }

  async function handleDefault(id: number): Promise<void> {
    try {
      const response = await axios.post<ApiResponseCommon>(
        `/api/user/address-user/default`,
        {
          addressID: id,
          email: address.email,
          isDefault: true,
        }
      );
      toast({
        title: 'Message',
        description: response.data.message,
      });
    } catch (error) {
      console.error('Error setting default address:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }
  }

  return (
    <Card key={address.id} className="relative bg-white dark:bg-zinc-950">
      {address.isDefault && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs font-medium rounded-full">
          Default
        </div>
      )}
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{address.fullName}</h3>
            <p className="text-sm text-muted-foreground">
              {address.streetName}
            </p>
            <p className="text-sm text-muted-foreground">
              {address.city}, {address.state} {address.pincode}
            </p>
            <p className="text-sm text-muted-foreground">{address.country}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Phone: {address.phoneNo}
            </p>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-4 flex gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-auto p-0">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg md:max-w-xl p-5 md:p-6 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl font-semibold">
                Update Address
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="streetName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter street name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pincode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full py-2 md:py-3 text-lg rounded-lg"
                >
                  Update Address
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <span className="text-muted-foreground">|</span>
        <Button
          variant="ghost"
          className="h-auto p-0"
          onClick={() => {
            handleRemove(address.addressID);
          }}
        >
          Remove
        </Button>
        {!address.isDefault && (
          <>
            <span className="text-muted-foreground">|</span>
            <Button
              variant="ghost"
              className="h-auto p-0"
              onClick={() => {
                handleDefault(address.addressID);
              }}
            >
              Set as Default
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
