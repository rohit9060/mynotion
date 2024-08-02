"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpSchema, OtpType } from "@/schema";
import { Api } from "@/lib";

// icons
import { FaKey } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("otp");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OtpType>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: search || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: OtpType) =>
      Api.post("/auth/email/verify", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      reset();
      router.push("/auth/signin");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit: SubmitHandler<OtpType> = async (data) => {
    mutate(data);
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-3 px-3">
      <div className="flex flex-col shadow-lg bg-gray-800 py-5 px-3 rounded-lg w-full lg:w-1/3 md:w-2/3">
        <div className=" text-center mb-5">
          <h1 className="font-semibold text-xl text-lime-500">
            Email Verification
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8 relative">
            <input
              className="h-[2.5rem]  w-full  m-1  py-2 pl-8 pr-4 text-black rounded-md"
              type="text"
              placeholder="OTP"
              {...register("otp")}
            />
            <FaKey
              className="absolute start-2 top-4 m-auto w-5 h-5 text-black"
              size={18}
            />
            {errors.otp && (
              <p className="mt-2 text-red-600 text-center">
                {errors.otp.message}
              </p>
            )}
          </div>

          <div className="mt-8">
            <button
              className="bg-pink-800 px-4 py-1 rounded-md w-full"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Verify"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center flex flex-col gap-2">
          <Link href="/auth/forgot-password" className="text-blue-500">
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
