import { NavBar } from "@/components";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main className="bg-gray-950 min-h-screen text-white">{children}</main>
    </>
  );
}
