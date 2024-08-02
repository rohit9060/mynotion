import type { Metadata } from "next";
import "@/styles/globals.css";
import { ReactQueryProvider } from "@/lib";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "My Notion",
  description:
    "Unleash your productivity with My Notion, the ultimate tool for organizing your life. Whether you are jotting down notes, planning your to-do list, or scheduling tasks, Notion brings everything together in one place. Customize your workspace to suit your needs and streamline your workflow with our intuitive and versatile features. Say goodbye to clutter and chaos—embrace a more organized and efficient way of managing your life with My Notion.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
