"use server";
import Link from "next/link";
import React from "react";
import NavbarButtons from "./NavbarButtons";
import NavbarLists from "./NavbarLists";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full  z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Home
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3   ">
          {/* Login Register OR Logout Delete Buttons  */}
          <NavbarButtons />
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          {/* Navbar Menu */}
          <NavbarLists />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
