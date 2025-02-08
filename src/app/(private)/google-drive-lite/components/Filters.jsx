import React from "react";

const Filters = ({ setSort, setSearch }) => {
  return (
    <>
      <select
        onChange={(e) => setSort(e.target.value)}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        defaultValue="Sort"
      >
        <option disabled>Sort</option>
        <option value="byName">by name</option>
        <option value="byDate">by date</option>
      </select>

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
