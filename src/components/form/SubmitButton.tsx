"use client";
import { Button } from "@headlessui/react";

export function SubmitButton({
  title,
  isPending = false,
}: {
  title: string;
  isPending: boolean;
}) {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-md bg-pink-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-pink-700 data-[open]:bg-pink-700 data-[focus]:outline-1 data-[focus]:outline-white"
    >
      {isPending ? "Loading..." : title}
    </Button>
  );
}
