"use client";
import Avatar from "react-avatar";

export default function Page() {
  const profile = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    phone: "+1234567890",
    isVerified: true,
    role: "User",
  };

  return (
    <div className="text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-6">User Profile</h1>
      <div className="flex items-center space-x-6 mb-6">
        <div className="w-32 h-32">
          <Avatar
            src={profile.avatar}
            name={profile.name || "User"}
            round
            alt="Avatar"
          />
        </div>
      </div>

      {/*  Add form to update profile */}
      <div className="bg-gray-900 p-4 rounded-lg shadow-inner">
        <div className="flex items-center mb-4">
          <span className="w-36 font-semibold">Name:</span>
          <span className="ml-2 truncate ">{profile.name}</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="w-36 font-semibold">Email:</span>
          <span className="ml-2 truncate ">{profile.email}</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="w-36 font-semibold">Phone:</span>
          <span className="ml-2 ">{profile.phone}</span>
        </div>
        <div className="flex items-center">
          <span className="w-36 font-semibold">Role:</span>
          <span className="ml-2 ">{profile.role}</span>
        </div>

        <div className="flex items-center my-4">
          <span className="w-36 font-semibold ">Verified:</span>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              profile.isVerified
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {profile.isVerified ? "Yes" : "No"}
          </span>
        </div>

        <div className="flex items-center">
          <span className="w-36 font-semibold">Role:</span>
          <span className="">{profile.role}</span>
        </div>

        <div className="flex items-center justify-between mt-4 space-x-2">
          <div className="flex items-center mt-4">
            <button className="px-4 py-2 rounded-lg bg-blue-800 text-white">
              Update Profile
            </button>
          </div>

          <div className="flex items-center mt-4">
            <button className="px-4 py-2 rounded-lg bg-red-800 text-white">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
