"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInType, SignInSchema } from "@/schema";
import { Api } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store";
import { FormInput } from "@/components";

// icons
import { MdEmail } from "react-icons/md";
import { SubmitButton } from "@/components";

function Page() {
  const { signIn } = useAuthStore();

  const { register, handleSubmit, reset, control } = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignInType) =>
      Api.post("/auth/signin", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      signIn({
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
        avatar: data.data.avatar,
        role: data.data.role,
      });
      reset();
      window.location.replace("/dashboard");
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
      <div className="flex flex-col shadow-lg bg-gray-800 backdrop-blur py-5 px-3 rounded-lg w-full lg:w-1/3 md:w-2/3">
        <div className=" text-center mb-5">
          <h1 className="font-semibold text-xl text-lime-500">Sign In</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            control={control}
            {...register("email")}
            name="email"
            label="Email"
            icon={<MdEmail size={20} />}
          />

          <FormInput
            control={control}
            {...register("password")}
            name="password"
            label="Password"
            type="password"
            icon={<MdEmail size={20} />}
          />

          <SubmitButton title="Sign In" isPending={isPending} />
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
