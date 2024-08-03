"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema, ResetPasswordType } from "@/schema";
import { Api } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FormInput, SubmitButton } from "@/components";
import { Suspense } from "react";

// icons
import { FaKey } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("otp");

  const { register, handleSubmit, control, reset } = useForm<ResetPasswordType>(
    {
      resolver: zodResolver(ResetPasswordSchema),
      defaultValues: {
        otp: search || "",
      },
    }
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ResetPasswordType) =>
      Api.post("/auth/password/reset", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      reset();
      router.push("/auth/signin");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
    mutate(data);
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-3 px-3">
      <div className="flex flex-col shadow-lg bg-gray-800 py-5 px-3 rounded-lg w-full lg:w-1/3 md:w-2/3">
        <div className=" text-center mb-5">
          <h1 className="font-semibold text-xl text-lime-500">
            Reset Password
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            control={control}
            {...register("otp")}
            name="otp"
            label="OTP"
            icon={<FaKey size={20} />}
          />

          <FormInput
            control={control}
            {...register("password")}
            name="password"
            label="Password"
            type="password"
            icon={<RiLockPasswordFill size={20} />}
          />

          <SubmitButton title="Reset Password" isPending={isPending} />
        </form>

        <div className="mt-6 text-center flex flex-col gap-2">
          <Link href="/auth/signup" className="text-blue-500">
            Do not have an account? Sign up
          </Link>
        </div>
      </div>
    </section>
  );
}

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}

export default Page;
