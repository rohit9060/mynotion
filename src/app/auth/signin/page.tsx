"use client";

function Page() {
  return (
    <section className="flex flex-col items-center justify-center h-screen gap-3 px-3">
      <div className="flex flex-col shadow-lg bg-gray-800 py-5 px-3 rounded-lg w-full lg:w-1/3 md:w-2/3">
        <div className=" text-center mb-5">
          <h1 className="font-semibold text-xl text-lime-500">Sign In</h1>
        </div>
        <form>
          <div className="mb-8 ">
            <input
              className="rounded-md p-1 w-full"
              type="email"
              name="email"
            />
            {/* <p className="mt-2 text-red-600 text-center">error</p> */}
          </div>
          <div className="mb-8">
            <input
              className="rounded-md p-1 w-full"
              type="password"
              name="password"
            />
            {/* <p className="mt-2 text-red-600 text-center">error</p> */}
          </div>
          <div className="mt-8">
            <button className="bg-pink-800 px-4 py-1 rounded-md w-full">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Page;
