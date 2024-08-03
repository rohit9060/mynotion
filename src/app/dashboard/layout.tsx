import { AuthProvider } from "@/lib";
import { Sidebar } from "@/components";
import { Suspense } from "react";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        {/* Main Content */}
        <main className="bg-gray-950 flex h-screen text-white">
          {/* sidebar */}
          <Sidebar />
          <section className="flex-1 overflow-y-auto">{children}</section>
        </main>
      </Suspense>
    </AuthProvider>
  );
}
