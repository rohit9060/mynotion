"use client";
import Link from "next/link";
import React, { useState } from "react";

// icons
import { RiMenu3Fill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <aside
      className={`bg-gray-900 text-white ${
        isCollapsed ? "w-18" : "w-64"
      } space-y-6 py-7 px-2 inset-y-0 left-0 transform md:relative md:flex md:flex-col transition duration-200 ease-in-out`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="focus:outline-none w-full flex justify-end"
      >
        <RiMenu3Fill size={24} />
      </button>

      <nav>
        <Link
          href="/"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white"
        >
          <IoHome size={24} title="Home" />
          {!isCollapsed && <span className="ml-4">Home</span>}
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white"
        >
          <MdDashboard size={24} title="Dashboard" />
          {!isCollapsed && <span className="ml-4">Dashboard</span>}
        </Link>

        <Link
          href="/dashboard/tasks"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white"
        >
          <FaTasks size={24} title="Tasks" />
          {!isCollapsed && <span className="ml-4">Tasks</span>}
        </Link>

        <Link
          href="/dashboard/notes"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white"
        >
          <FaNoteSticky size={24} title="Notes" />
          {!isCollapsed && <span className="ml-4">Notes</span>}
        </Link>

        <Link
          href="/dashboard/todos"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white"
        >
          <LuListTodo size={24} title="Todos" />
          {!isCollapsed && <span className="ml-4">Todos</span>}
        </Link>

        <Link
          href="/dashboard/profile"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800  hover:text-white"
        >
          <FaUserCircle size={24} title="Profile" />
          {!isCollapsed && <span className="ml-4">Profile</span>}
        </Link>

        <button className="flex items-center py-2.5 px-4 rounded transition duration-200 bg-pink-800 hover:bg-pink-900 hover:text-white mt-5 w-full">
          <FaSignOutAlt size={24} title="Sign out" />
          {!isCollapsed && <span className="ml-4">Sign out</span>}
        </button>
      </nav>
    </aside>
  );
}
