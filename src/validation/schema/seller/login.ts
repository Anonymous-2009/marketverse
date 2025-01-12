import { z } from 'zod';

export const SellerLoginSchema = z.object({
  username: z.string().min(3, {
     message: "Username must be at least 3 characters.",
   }),
   password: z.string().min(8, {
     message: "Password must be at least 8 characters.",
   }),
   email: z.string().email({
     message: "Please enter a valid email address.",
   }),
   firstName: z.string().min(1, {
     message: "First name is required.",
   }),
   lastName: z.string().min(1, {
     message: "Last name is required.",
   }),
});

export type SellerLoginType = z.infer<typeof SellerLoginSchema>;
