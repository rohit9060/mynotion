"use client";
import { useAuthStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const queryClient = new QueryClient();

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { auth } = useAuthStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuth) {
      router.push("/auth/signin");
    }
  }, [auth.isAuth, router]);

  return <>{children}</>;
}
