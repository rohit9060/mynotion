import { AuthProvider } from "@/lib";
import { Sidebar } from "@/components";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <>
        {/* Main Content */}
        <main className="bg-gray-950 flex h-screen text-white">
          {/* sidebar */}
          <Sidebar />
          <section className="flex-1 overflow-y-auto">{children}</section>
        </main>
      </>
    </AuthProvider>
  );
}
