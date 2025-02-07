"use client";
import useGetUser from "@/utils/hooks/useGetUser";
import React, { useEffect, useState } from "react";
import TodoLists from "./Components/TodoLists";
import TodoHeader from "./Components/TodoHeader";

const Page = () => {
  const { user, supabase } = useGetUser();
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Funtion handles edit and add todo
  const handleButtonClick = async () => {
    if (!newTodo.trim() || !user) return;

    try {
      // Undentify if it is Edit or Add Todo
      if (editId) {
        //Edit Todo
        const { data, error } = await supabase
          .from("todos")
          .update({ task: newTodo })
          .eq("id", editId)
          .select();
        if (error) throw new Error(error.message);

        const updatedTodos = todos.map((todo) =>
          todo.id == editId ? { ...todo, task: newTodo } : todo
        );
        setTodos(updatedTodos);
      } else {
        //Add Todo
        const { data, error } = await supabase
          .from("todos")
          .insert([{ task: newTodo, user_id: user.id }])
          .select();

        if (error) throw new Error(error.message);

        setTodos((prev) => [...prev, ...data]);
      }
      setNewTodo("");
      setEditId(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Read Todo in the database
  useEffect(() => {
    if (!user.id) return;
    const fetchTodos = async () => {
      try {
        const { data, error } = await supabase
          .from("todos")
          .select("*")
          .eq("user_id", user.id)
          .order("id", { ascending: true });

        if (error) throw new Error(error);
        setIsLoading(false);

        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, [user]);

  // Initialize the item will edit
  function handleEditButtonCLick(todo) {
    setEditId(todo.id);
    setNewTodo(todo.task);
  }
  // Delete Todo
  async function handleDeleteTodo(id) {
    await supabase.from("todos").delete().eq("id", id);
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="h-screen flex justify-center items-center pt-3">
      <div className=" bg-white max-w-4xl w-full  p-8 space-y-5">
        <TodoHeader
          editId={editId}
          handleButtonClick={handleButtonClick}
          setNewTodo={setNewTodo}
          newTodo={newTodo}
        />
        <TodoLists
          todos={todos}
          isLoading={isLoading}
          handleDeleteTodo={handleDeleteTodo}
          handleEditButtonCLick={handleEditButtonCLick}
        />
      </div>
    </div>
  );
};

export default Page;
