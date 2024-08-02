"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpType } from "@/schema";
import { Api } from "@/lib";

// icons
import { MdEmail } from "react-icons/md";
import { SiNamebase } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function Page() {
  const [isPassword, setIsPassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpType) =>
      Api.post("/auth/signup", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit: SubmitHandler<SignUpType> = async (data) => {
    mutate(data);
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-3 px-3">
      <div className="flex flex-col shadow-lg bg-gray-800 py-5 px-3 rounded-lg w-full lg:w-1/3 md:w-2/3">
        <div className=" text-center mb-5">
          <h1 className="font-semibold text-xl text-lime-500">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8 relative">
            <input
              className="h-[2.5rem]  w-full  m-1  py-2 pl-8 pr-4 text-black rounded-md"
              type="text"
              placeholder="Name"
              {...register("name")}
            />
            <SiNamebase
              className="absolute start-2 top-3 m-auto w-5 h-5 text-black"
              size={20}
            />
            {errors.name && errors.name.message && (
              <p className="mt-2 text-red-600 text-center">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-8 relative">
            <input
              className="h-[2.5rem]  w-full  m-1  py-2 pl-8 pr-4 text-black rounded-md"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            <MdEmail
              className="absolute start-2 top-4 m-auto w-5 h-5 text-black"
              size={20}
            />
            {errors.email && (
              <p className="mt-2 text-red-600 text-center">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-8 relative">
            <input
              className="h-[2.5rem]  w-full  m-1  py-2 pl-8 pr-4 text-black rounded-md"
              type="text"
              placeholder="Phone"
              {...register("phone")}
            />
            <FaPhoneAlt
              className="absolute start-2 top-4 m-auto w-5 h-5 text-black"
              size={20}
            />
            {errors.phone && errors.phone.message && (
              <p className="mt-2 text-red-600 text-center">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="mb-8 relative">
            <input
              className="h-[2.5rem]  w-full  m-1  py-2 pl-8 pr-4 text-black rounded-md"
              type={isPassword ? "password" : "text"}
              placeholder="Password"
              {...register("password")}
            />
            <RiLockPasswordFill
              className="absolute start-2 top-4 m-auto w-5 h-5 text-black"
              size={20}
            />
            {isPassword ? (
              <FaEyeSlash
                className="absolute end-2 top-4 m-auto w-5 h-5 text-black"
                size={20}
                onClick={() => {
                  setIsPassword(false);
                }}
              />
            ) : (
              <FaEye
                className="absolute end-2 top-4 m-auto w-5 h-5 text-black"
                size={20}
                onClick={() => {
                  setIsPassword(true);
                }}
              />
            )}

            {errors.password && errors.password.message && (
              <p className="mt-2 text-red-600 text-center">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mt-8">
            <button
              className="bg-pink-800 px-4 py-1 rounded-md w-full"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center flex flex-col gap-2">
          <Link href="/auth/forgot-password" className="text-blue-500">
            Forgot password?
          </Link>

          <Link href="/auth/signin" className="text-blue-500">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Page;
