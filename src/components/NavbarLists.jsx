// "use client";
import Link from "next/link";
import React from "react";

const NavbarLists = () => {
  const lists = [
    { path: "/todo-lists", label: "Todo Lists App" },
    { path: "/google-drive-lite", label: "Goggle Drive Lite" },
    { path: "/food-review-app", label: "Food Review App" },
    { path: "/pokemon-review-app", label: "Pokemon Review App" },
    { path: "/markdown-note-app", label: "Markdown Notes App" },
  ];
  return (
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {lists &&
        lists.map(({ path, label }) => (
          <li key={path}>
            <Link
              href={path}
              className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              {label}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default NavbarLists;
