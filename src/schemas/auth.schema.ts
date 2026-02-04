import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z
      .string()
      .max(11, {
        message: "Phone number not more than 11 digit.",
      })
      .regex(/^(\+880\s?|0)1[3-9]\d{2}-?\d{6}$/, "Invalid phone number."),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupInput = z.infer<typeof signupSchema>;
