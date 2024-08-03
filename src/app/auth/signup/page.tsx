"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpType } from "@/schema";
import { Api } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FormInput, SubmitButton } from "@/components";

// icons
import { MdEmail } from "react-icons/md";
import { SiNamebase } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

function Page() {
  const router = useRouter();

  const { register, handleSubmit, control, reset } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpType) =>
      Api.post("/auth/signup", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      reset();
      router.push("/auth/email/verify");
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
          <FormInput
            {...register("name")}
            label="Name"
            placeholder="Name"
            control={control}
            icon={<SiNamebase size={20} />}
          />

          <FormInput
            {...register("email")}
            label="Email"
            placeholder="Email"
            type="email"
            control={control}
            icon={<MdEmail size={20} />}
          />

          <FormInput
            {...register("phone")}
            label="Phone"
            placeholder="Phone"
            control={control}
            icon={<FaPhoneAlt size={20} />}
          />

          <FormInput
            {...register("password")}
            label="Password"
            placeholder="Password"
            type="password"
            control={control}
            icon={<RiLockPasswordFill size={20} />}
          />

          <SubmitButton title="Sign Up" isPending={isPending} />
        </form>

        <div className="mt-6 text-center flex flex-col gap-2">
          <Link href="/auth/password/forgot" className="text-blue-500">
            Forgot password?
          </Link>

          <Link href="/auth/email/send" className="text-blue-500">
            Did not receive verification email? Resend
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
