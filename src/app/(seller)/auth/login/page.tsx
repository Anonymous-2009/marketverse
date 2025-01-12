'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { SellerLoginType, SellerLoginSchema } from '@/validation';
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import axios from 'axios'
import { useSignUp } from '@clerk/nextjs';

export default function LoginPage() {
  const { isLoaded, signUp } = useSignUp();
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const form = useForm<SellerLoginType>({
    resolver: zodResolver(SellerLoginSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: SellerLoginType) =>{
    console.log(values)
    // Here you would typically send the form data to your backend
    console.log(isLoaded);
    if (isLoaded) {
      try {
       const data = await signUp.create({
          first_name: values.firstName,
          last_name: values.lastName,
          email_address: values.email,
          username: values.username,
          password: values.password,
        });
  
        console.log("Data:", data);
        // send the email.
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
  
        // change the UI to our pending section.
        // setPendingVerification(true);
      } catch (error) {
        console.error("Error signing up:", error);
      }
    }
  
    // try {
    //   const response = await axios.post('/api/login', values);
    //   const result = response.data;
    //   // console.log("Response:", result);
    //   toast({
    //     title: "Message",
    //     description: result.message,
    //     action: (
    //       <ToastAction altText="OK">OK</ToastAction>
    //     ),
    //   })
    // } catch (error) {
    //   console.error("Error:", error);
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: "There was a problem with your request.",
    //     action: <ToastAction altText="Try again">Try again</ToastAction>,
    //   })
    // } 
  }
  // Verify User Email Code
  const onPressVerify = async (e:any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== 'complete') {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === 'complete') {
        // await setActive({ session: completeSignUp.createdSessionId });
        // router.push('/');
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your details to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-gray-500 text-center">
            Already have an account?
          </div>
          <Link href="/auth/signup" className="w-full">   
          <Button variant="outline" className="w-full">
            Sign In
            </Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

