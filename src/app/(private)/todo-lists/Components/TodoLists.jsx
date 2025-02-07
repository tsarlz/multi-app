const TodoLists = ({
  todos,
  handleEditButtonCLick,
  handleDeleteTodo,
  isLoading,
}) => {
  return (
    <ul className="bg-gray-200 h-full px-8 py-4  rounded-md space-y-5 scroll-none max-h-[58vh]">
      {isLoading ? (
        <p>Loading ....</p>
      ) : todos.length > 0 ? (
        todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-white p-3 flex justify-between items-center rounded-md"
          >
            <h4>{todo.task}</h4>
            <div className="space-x-3">
              <button
                onClick={() => handleEditButtonCLick(todo)}
                className="h-9 bg-indigo-500 px-4 text-center rounded-lg text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="h-9 bg-red-500 px-4 text-center rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))
      ) : (
        <li>
          <p>You don't have todo yet..</p>
        </li>
      )}
    </ul>
  );
};

export default TodoLists;
