"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailSchema, EmailType } from "@/schema";
import { Api } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FormInput, SubmitButton } from "@/components";

// icons
import { MdEmail } from "react-icons/md";

function Page() {
  const router = useRouter();

  const { register, handleSubmit, control, reset } = useForm<EmailType>({
    resolver: zodResolver(EmailSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: EmailType) =>
      Api.post("/auth/password/forgot", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      reset();
      router.push("/auth/password/reset");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit: SubmitHandler<EmailType> = async (data) => {
    mutate(data);
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-3 px-3">
      <div className="flex flex-col shadow-lg bg-gray-800 py-5 px-3 rounded-lg w-full lg:w-1/3 md:w-2/3">
        <div className=" text-center mb-5">
          <h1 className="font-semibold text-xl text-lime-500">
            Forgot Password
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            control={control}
            {...register("email")}
            name="email"
            label="Email"
            icon={<MdEmail size={20} />}
          />

          <SubmitButton title="Forgot Password" isPending={isPending} />
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

export default Page;
