import React from "react";

const EditDeleteIcons = ({
  top,
  right,
  translate,
  editFunction,
  spaceX,
  deleteFunction,
}) => {
  return (
    <div
      className="absolute flex opacity-0  group-hover:opacity-100"
      style={{
        top: `${top}px`,
        right: `${right}px`,
        transform: `translateY(-${translate}px)`,
        gap: `${spaceX}px`,
      }}
    >
      <svg
        onClick={deleteFunction}
        className="w-6 h-6 text-red-500 hover:text-red-700 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
        />
      </svg>
      <svg
        onClick={editFunction}
        className="w-6 h-6 text-indigo-600 hover:text-indigo-400  dark:text-white "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
        />
      </svg>
    </div>
  );
};

export default EditDeleteIcons;
