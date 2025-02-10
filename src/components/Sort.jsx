import React from "react";

const Sort = ({ setSort }) => {
  return (
    <select
      id="countries"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/3"
      defaultValue="Sort"
      onChange={(e) => setSort(e.target.value)}
    >
      <option disabled>Sort</option>
      <option value="byName">by name</option>
      <option value="byDate">by date</option>
    </select>
  );
};

export default Sort;
