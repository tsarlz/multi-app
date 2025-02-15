"use client";
import ReactMarkdown from "react-markdown";
import { FiPlusCircle } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import useGetUser from "@/utils/hooks/useGetUser";
import useFetch from "@/utils/hooks/useFetch";

const Page = () => {
  const { user, supabase } = useGetUser();
  const [toEditNote, setToEditNote] = useState({ title: "", content: "" });
  const [activeNote, setActiveNote] = useState(false);

  //READ
  const { notes, setNotes, isLoading } = useFetch(
    null,
    user,
    null,
    supabase,
    null,
    "notes"
  );

  // CREATE
  const handleAddNote = async () => {
    // ADD NOTES
    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          user_id: user.id,
          title: "Untitled Note",
          content: "",
        },
      ])
      .select();
    if (error) {
      console.log(error);
      return;
    }
    setNotes((prev) => [...prev, ...data]);
  };

  // UPDATE
  const handleSave = async () => {
    if (toEditNote.title == "") return;
    try {
      const { data, error } = await supabase
        .from("notes")
        .update({
          title: toEditNote.title,
          content: toEditNote.content,
        })
        .eq("id", toEditNote.id)
        .select();

      if (error) {
        console.log(error);
        return;
      }

      setNotes((prev) =>
        prev.map((note) => (note.id === toEditNote.id ? data[0] : note))
      );
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE
  const handleDelete = async (noteId) => {
    await supabase.from("notes").delete().eq("id", noteId);

    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  //INIT Edit
  const handleToEditNote = (note) => {
    setToEditNote(note);
    setActiveNote(note.id);
  };
  // Save
  useEffect(() => {
    handleSave();
  }, [toEditNote, notes]);

  return (
    <div
      className="max-h-full
     flex justify-center items-center bg-gray-200"
    >
      {/* // */}
      <div className="flex justify-between  w-full max-h-screen ">
        <aside className="bg-white h-screen flex flex-col justify-start items-start w-1/4 px-5 pt-20">
          <div className="flex justify-between items-center w-full border-b-2 mb-2 py-2 ">
            <h3 className="text-3xl font-semibold ">Notes:</h3>
            <FiPlusCircle
              onClick={handleAddNote}
              size={30}
              className=" hover:text-gray-500"
            />
          </div>
          <ul className="space-y-2 text-lg font-semibold w-full h-full  scroll-style p-2">
            {isLoading ? (
              <li>Loading...</li>
            ) : notes.length > 0 ? (
              notes.map((note) => (
                <li
                  onClick={() => handleToEditNote(note)}
                  key={note?.id}
                  className={`bg-gray-100 w-full truncate p-3 rounded-2xl relative  group hover:bg-gray-300 ${
                    activeNote == note?.id && "bg-blue-300"
                  }`}
                >
                  {note?.title ? note.title : "Title"}

                  <FiTrash
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note?.id);
                    }}
                    className="absolute top-1/2 right-2 -translate-y-1/2  opacity-0 group-hover:opacity-100"
                  />
                </li>
              ))
            ) : (
              <li>No notes added yet..</li>
            )}
          </ul>
        </aside>

        <main className="w-full flex flex-col justify-center items-center min-h-screen  pt-20 mx-10  overflow-y-auto scroll-none">
          {activeNote ? (
            <>
              <form className="flex flex-col w-full h-full space-y-4  ">
                <input
                  value={toEditNote.title}
                  onChange={(e) =>
                    setToEditNote((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Title..."
                  className="text-xl p-1 px-2 "
                  type="text"
                  name="title"
                />
                <textarea
                  value={toEditNote.content}
                  onChange={(e) =>
                    setToEditNote((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className=" p-2 resize-none"
                  name="content"
                  rows="10"
                  cols="full"
                ></textarea>
              </form>
              <div className="w-full min-h-[40%] max-h-auto mb-5 mt-5  bg-white p-4 ">
                <h1 className="text-xl font-semibold mb-3">
                  {toEditNote.title ? toEditNote.title : "Title"}
                </h1>
                <ReactMarkdown>
                  {toEditNote.content ? toEditNote.content : "note preview"}
                </ReactMarkdown>
              </div>
            </>
          ) : (
            <h3>No no Selected</h3>
          )}
        </main>
      </div>
    </div>
  );
};

export default Page;
