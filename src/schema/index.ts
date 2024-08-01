import * as z from "zod";

export const SignUpSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  phone: z.string().optional(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(50, {
      message: "Password must be less than 50 characters long",
    }),
});

export const SignInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(50, {
      message: "Password must be less than 50 characters long",
    }),
});

export const EmailSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
});

export const OtpSchema = z.object({
  otp: z
    .string({ required_error: "OTP is required" })
    .min(4, {
      message: "OTP must be 4 digits long",
    })
    .max(6, {
      message: "OTP must be 6 digits long",
    }),
});
