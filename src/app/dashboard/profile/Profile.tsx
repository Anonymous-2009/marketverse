import React from 'react'

import { useState } from 'react';
import { Upload, User, Mail, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { ProfileSkeleton } from '@/components/custom/skeleton/Profile-Skeleton';
import { useFetchDataByEmail } from '@/app/service/detail/fetchDataByEmail';
import { SellerInfo } from '@/db/schema';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { updateSchema, updateType } from '@/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const Profile = ({ email }: any) => {
   const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<updateType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      age: 0,
      phoneNo: '',
      gender: 'prefer-not-to-say',
      profileImageUrl: '',
      email: email
    },
  });
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isUploading, setUploading] = useState(false);
    const { data, isLoading, isError, error } = useFetchDataByEmail(email);
     // Use the custom mutation hook
     
    if (isLoading) {
        return <ProfileSkeleton />;
      }

      
    
      const handleUpload = async (event:any) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('email',email);

      const response = await axios.put('/api/upload', formData);
      const data = await response.data;
      toast({
        title: 'Message',
        description: response.data.message,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    //   console.log(data)
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setUploading(false);
    }
  };

 
  const handleFormSubmit = async (data: updateType) => {
    // console.log('Form submitted:', data);
    try {
      // Log the form data
      const response = await axios.put('/api/update', data);
      const result = await response.data;
      // console.log(result)
      toast({
        title: 'Message',
        description: result.message,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      // Close dialog and reset form
      setIsOpen(false);
      // reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  return (
    <div className="container mx-auto py-10">
    {/* work on later  */}

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Seller Profile Information</h1>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>Update Profile</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Profile Information</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage
                          // src={user.profileImageUrl}
                          alt="Profile picture"
                        />
                        <AvatarFallback>
                          {' USER '}
                          {/* {user.firstName?.charAt(0) +
                            user.lastName?.charAt(0) || 'U'} */}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md">
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                      </div>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUpload}
                        disabled={isUploading}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        {...register('firstName')}
                      />{errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                  id="lastName"
                  {...register('lastName')}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
                )}
                    </div>

                    <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  {...register('age', { valueAsNumber: true })}
                  className={errors.age ? 'border-red-500' : ''}
                />
                {errors.age && (
                  <p className="text-sm text-red-500">{errors.age.message}</p>
                )}
              </div>

                    
              <div className="space-y-2">
                <Label htmlFor="phoneNo">Phone number</Label>
                <Input
                  id="phoneNo"
                  type="tel"
                  {...register('phoneNo')}
                  className={errors.phoneNo ? 'border-red-500' : ''}
                />
                {errors.phoneNo && (
                  <p className="text-sm text-red-500">{errors.phoneNo.message}</p>
                )}
              </div>

                    
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                  onValueChange={(value) => setValue('gender', value as updateType['gender'])}
                  value={watch('gender')}
                >
                  <SelectTrigger className={errors.gender ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-red-500">{errors.gender.message}</p>
                )}
              </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        

    {/* Profile View */}
    {data.data.map((user: SellerInfo) => (
          <Card key={user.id} className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={user.profileImageUrl}
                      alt="Profile picture"
                    />
                    <AvatarFallback>
                      {' '}
                      {user.firstName?.charAt(0) + user.lastName?.charAt(0) ||
                        'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Full Name
                        </p>
                        <p className="text-lg font-medium">
                          <span className="mr-1">{user.firstName}</span>
                          <span>{user.lastName}</span>
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Age</p>
                        <p className="text-lg font-medium">
                          {user.age} years
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <p className="text-lg font-medium">{user.email}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <p className="text-lg font-medium">
                            {user.phoneNo}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Gender
                        </p>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <p className="text-lg font-medium capitalize">
                            {user.gender}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        
      ))}
  </div>
  )
}

export default Profile