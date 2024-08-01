"use client";

import { useState } from "react";

function Page() {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-3 px-3">
      <div className="flex flex-col shadow-lg bg-gray-800 py-5 px-3 rounded-lg w-full lg:w-1/3 md:w-2/3">
        <div className=" text-center mb-5">
          <h1 className="font-semibold text-xl text-lime-500">Sign Up</h1>
        </div>
        <form>
          <div className="mb-8 relative">
            <input
              className="rounded-md p-1 w-full text-black"
              type="email"
              name="email"
              placeholder="Email"
            />
            <p className="absolute top-1 left-2 text-black">icon</p>
            {/* <p className="mt-2 text-red-600 text-center">error</p> */}
          </div>
          <div className="mb-8 relative">
            <input
              className="rounded-md p-1 w-full text-black"
              type={isPassword ? "password" : "text"}
              name="password"
              placeholder="Password"
            />
            <p className="absolute top-1 left-2 text-black">icon</p>
            <p
              className="absolute top-1 right-2 text-black"
              onClick={() => {
                setIsPassword(!isPassword);
              }}
            >
              icon 2
            </p>
            {/* <p className="mt-2 text-red-600 text-center">error</p> */}
          </div>
          <div className="mt-8">
            <button className="bg-pink-800 px-4 py-1 rounded-md w-full">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Page;
