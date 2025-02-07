import React from "react";

const TodoHeader = ({ newTodo, setNewTodo, handleButtonClick, editId }) => {
  return (
    <header className="flex items-center justify-between space-x-32  ">
      <h1 className="text-2xl text-indigo-500 font-bold text-nowrap">
        My Todos
      </h1>
      <div className="flex h-full w-full">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          type="text"
          name="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="Todo.."
        />
        <button
          onClick={handleButtonClick}
          className="px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-r-lg transition-colors"
        >
          {editId ? "update" : "add"}
        </button>
      </div>
    </header>
  );
};

export default TodoHeader;
