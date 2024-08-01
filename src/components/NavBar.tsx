import Link from "next/link";

export function NavBar() {
  return (
    <header className="flex items-center justify-between px-5 py-6 bg-gray-900 text-white sticky top-0 z-50 w-full">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-blue-800">My</span>{" "}
          <span className="text-pink-800">Notion</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/getapp" className="px-4 py-1 bg-blue-800 rounded-md">
          Get App
        </Link>
        <Link href="/auth/signin" className="px-4 py-1 bg-pink-800 rounded-md">
          Sign In
        </Link>
      </div>
    </header>
  );
}
