import Sort from "@/components/Sort";
import React from "react";

const Filters = ({ setSort, setSearch }) => {
  return (
    <>
      <Sort setSort={setSort} />

      <div className="flex h-full ">
        <input
          type="text"
          name="text"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="Todo.."
        />
        <button className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-r-lg transition-colors">
          search
        </button>
      </div>
    </>
  );
};

export default Filters;
