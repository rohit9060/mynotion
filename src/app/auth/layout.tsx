import Link from "next/link";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="bg-gray-950 min-h-screen text-white">{children}</main>
    </>
  );
}
