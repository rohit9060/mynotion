"use client";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoFormType, TodoSchema } from "@/schema";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface AddTodoFormProps {
  todoId?: string;
  initialData?: TodoFormType;
}

export function TodoForm({ todoId, initialData }: AddTodoFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TodoFormType>({
    resolver: zodResolver(TodoSchema),
    defaultValues: initialData || {
      title: "",
      items: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    if (isOpen && initialData) {
      // Update the form when dialog opens
      reset(initialData);
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = (data: TodoFormType) => {
    if (todoId) {
      // Handle update logic here
      console.log("Updating todo:", todoId, data);
    } else {
      // Handle creation logic here
      console.log("Creating todo:", data);
    }
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
          if (!todoId) reset();
        }}
        className="bg-pink-800 hover:bg-pink-900 text-white font-bold py-1 px-4 rounded-lg"
      >
        {todoId ? "Update Todo" : "Add New Todo"}
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-gray-800">
            <DialogTitle className="text-xl font-bold text-white mb-4">
              {todoId ? "Update Todo" : "Add Todo"}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  id="title"
                  {...register("title")}
                  className={`shadow appearance-none border-none rounded-lg w-full py-2 px-3 text-white bg-white/5 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs italic">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Items
                </label>
                <div className="h-40 overflow-y-auto scrollbar-hide">
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center mb-2">
                      <input
                        {...register(`items.${index}.name` as const)}
                        className={`shadow appearance-none border-none rounded-lg w-full py-2 px-3 text-white bg-white/5 leading-tight focus:outline-none focus:shadow-outline ${
                          errors.items?.[index]?.name ? "border-red-500" : ""
                        }`}
                      />
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                {errors.items && (
                  <p className="text-red-500 text-xs italic">
                    {errors.items.message}
                  </p>
                )}
              </div>

              <Button
                type="button"
                onClick={() => append({ name: "" })}
                className="mb-4 bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded-lg w-full"
              >
                Add Item
              </Button>

              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className="bg-pink-800 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
                >
                  {todoId ? "Update Todo" : "Add Todo"}
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
