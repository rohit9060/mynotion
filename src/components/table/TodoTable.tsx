"use client";
import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DebouncedInput } from "@/components";
import { Button } from "@headlessui/react";

export function TodoTable() {
  const todos = [
    {
      title: "Title 1",
      items: [{ name: "Item 1.1" }, { name: "Item 1.2" }, { name: "Item 1.3" }],
    },
    {
      title: "Title 2",
      items: [{ name: "Item 2.1" }, { name: "Item 2.2" }, { name: "Item 2.3" }],
    },
    {
      title: "Title 3",
      items: [{ name: "Item 3.1" }, { name: "Item 3.2" }, { name: "Item 3.3" }],
    },
  ];

  const fetchTodos = async ({ pageParam = 0, query = "" }) => {
    const page = pageParam || 0;
    const pageSize = 1;
    await new Promise((resolve) => setTimeout(resolve, 300));
    const filteredTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    return filteredTodos.slice(page * pageSize, page * pageSize + pageSize);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    refetch,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["todos", searchQuery],
    queryFn: ({ pageParam = 0 }) =>
      fetchTodos({ pageParam, query: searchQuery }),
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage.length === 1;
      if (!morePagesExist) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });

  return (
    <section className="relative">
      <h1>Todo Table</h1>

      <div className="sticky top-0 z-10 ">
        <DebouncedInput
          value={searchQuery}
          onChange={(value) => {
            setSearchQuery(value);
            refetch();
          }}
        />
      </div>

      <div>
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page.map((todo: any) => (
              <div key={todo.title}>
                <h2>{todo.title}</h2>
                <ul>
                  {todo.items.map((item: any) => (
                    <li key={item.name}>{item.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      {hasNextPage ? (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 bg-pink-800 px-2 py-1 rounded-lg text-white"
        >
          {isFetchingNextPage || isFetching ? "Loading..." : "Load more"}
        </Button>
      ) : (
        <div className="mt-4 text-gray-500">No more data</div>
      )}
    </section>
  );
}
