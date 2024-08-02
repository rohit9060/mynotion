"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { auth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuth === true) {
      router.push("/dashboard");
    }
  }, [auth.isAuth, router]);

  return (
    <>
      <main className="bg-gray-950 min-h-screen text-white">{children}</main>
    </>
  );
}
