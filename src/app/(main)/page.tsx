import { MyModal, TodoForm, TodoTable } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-screen max-w-[95%] mx-auto gap-3">
      <h1 className="text-3xl font-extrabold text-center">
        My Notion : Your Hub for Notes, Tasks, and More
      </h1>
      <h3 className="text-xl font-semibold text-gray-300 text-center">
        Capture Ideas, Track Tasks, and Stay Organized
      </h3>
      <p className="text-center text-lg font-normal text-gray-500">
        Unleash your productivity with My Notion, the ultimate tool for
        organizing your life. Whether you are jotting down notes, planning your
        to-do list, or scheduling tasks, Notion brings everything together in
        one place. Customize your workspace to suit your needs and streamline
        your workflow with our intuitive and versatile features. Say goodbye to
        clutter and chaos—embrace a more organized and efficient way of managing
        your life with My Notion.
      </p>

      <Link href="/getapp" className="px-4 py-1 bg-pink-800 rounded-md mt-5">
        Get App
      </Link>

      <TodoTable />
    </section>
  );
}
