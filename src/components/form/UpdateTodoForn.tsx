"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoFormType, TodoSchema } from "@/schema";

export function UpdateTodoForm({ todoId }: { todoId: string }) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TodoFormType>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
      items: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: TodoFormType) => {
    console.log(data);
    reset({
      title: "",
      items: [{ name: "" }],
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-transparent"
    >
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
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Items</label>
        <div className="h-40 overflow-y-auto scrollbar-hide">
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center mb-2">
              <input
                {...register(`items.${index}.name` as const)}
                className={`shadow appearance-none border-none rounded-lg w-full py-2 px-3 text-white bg-white/5 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.items?.[index]?.name ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {errors.items && (
          <p className="text-red-500 text-xs italic">{errors.items.message}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => append({ name: "" })}
        className="mb-4 bg-blue-800 hover:bg-blue-900 text-white font-bold py-1 px-4 rounded-lg w-full"
      >
        Add Item
      </button>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-pink-800 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
        >
          Update Todo
        </button>
      </div>
    </form>
  );
}
