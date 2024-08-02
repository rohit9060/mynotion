"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInType, SignInSchema } from "@/schema";
import { Api } from "@/lib";

// icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store";

function Page() {
  const [isPassword, setIsPassword] = useState(true);
  const { signIn } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignInType) =>
      Api.post("/auth/signin", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      signIn({
        name: data.data.name,
        email: data.data.email,
        avatar: data.data.avatar,
        role: data.data.role,
      });
      reset();
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit: SubmitHandler<SignInType> = async (data) => {
    mutate(data);
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-3 px-3">
      <div className="flex flex-col shadow-lg bg-gray-800 py-5 px-3 rounded-lg w-full lg:w-1/3 md:w-2/3">
        <div className=" text-center mb-5">
          <h1 className="font-semibold text-xl text-lime-500">Sign In</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {isPending ? "Loading..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center flex flex-col gap-2">
          <Link href="/auth/password/forgot" className="text-blue-500">
            Forgot password?
          </Link>

          <Link href="/auth/signup" className="text-blue-500">
            Do not have an account? Sign up
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Page;
