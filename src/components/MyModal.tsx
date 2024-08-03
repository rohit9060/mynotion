"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

interface MyModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title: string;
  buttonText: string;
  children: React.ReactNode;
}

export function MyModal({
  isOpen = false,
  onClose,
  title,
  buttonText,
  children,
}: MyModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const open = () => setIsModalOpen(true);
  const close = () => {
    setIsModalOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-pink-800 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-pink-900 data-[focus]:outline-1"
      >
        {buttonText}
      </Button>

      <Dialog
        open={isModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-800 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h1" className="text-xl font-medium text-white">
                {title}
              </DialogTitle>
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
