import * as z from "zod";

export const SignUpSchema = z.object({
  name: z
    .string({
      required_error: "name is required",
    })
    .min(2, { message: "minimum 2 characters" }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email" }),
  phone: z.string().optional(),
  password: z
    .string({ required_error: "password is required" })
    .min(8, {
      message: "minimum 8 characters",
    })
    .max(50, {
      message: "maximum 50 characters",
    }),
});

export type SignUpType = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email" }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, {
      message: "minimum 8 characters",
    })
    .max(50, {
      message: "maximum 50 characters",
    }),
});

export type SignInType = z.infer<typeof SignInSchema>;

export const EmailSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email" }),
});

export type EmailType = z.infer<typeof EmailSchema>;

export const OtpSchema = z.object({
  otp: z
    .string({ required_error: "otp is required" })
    .min(4, {
      message: "minimum 4 digits",
    })
    .max(6, {
      message: "maximum 6 digits",
    }),
});

export type OtpType = z.infer<typeof OtpSchema>;

export const ResetPasswordSchema = z.object({
  otp: z
    .string({ required_error: "otp is required" })
    .min(4, {
      message: "minimum 4 digits",
    })
    .max(6, {
      message: "maximum 6 digits",
    }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, {
      message: "minimum 8 characters",
    })
    .max(50, {
      message: "maximum 50 characters",
    }),
});

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

export const TodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  items: z
    .array(
      z.object({
        name: z.string().min(1, "Item is required"),
      })
    )
    .min(1, "At least one item is required"),
});

export type TodoFormType = z.infer<typeof TodoSchema>;
