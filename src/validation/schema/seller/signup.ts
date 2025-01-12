import { z } from 'zod';

export const SellerSignupSchema = z.object({
  email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
});

export type SellerSignupType = z.infer<typeof SellerSignupSchema>;
