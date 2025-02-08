"use client";
import useGetUser from "@/utils/hooks/useGetUser";
import React, { useRef, useState } from "react";
import PhotoLists from "./components/PhotoLists";
import Header from "./components/Header";
import Filters from "./components/Filters";

const Page = () => {
  const { user, supabase } = useGetUser();
  const fileRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [toEditName, setToEditName] = useState(null);
  const [sort, setSort] = useState("updated_at");
  const [search, setSearch] = useState("");

  //CREATE && UPDATE - Handle upload of the photos
  // Can be found in Header Component

  //READ - Getting Photo on Database // Sort and Search
  // Can found in PhotoList Component

  //EDIT - Initiate Edit
  const handleClickEdit = async (photo) => {
    setToEditName(photo.storage_name);
    fileRef.current.click();
  };

  // DELETE -
  const handleClickDelete = async (photo) => {
    deleteFunction(photo.storage_name); // Delete the photo in storage

    const { error } = await supabase.from("photos").delete().eq("id", photo.id); // Delete Photo in database

    if (error) {
      console.log(error);
      return;
    }

    setPhotos((prev) => prev.filter((p) => p.id !== photo.id)); // Update UI
  };

  // Reusable DELETE Function
  async function deleteFunction(storageName) {
    const { error: deleteError } = await supabase.storage
      .from("google_drive_photos")
      .remove([`${user.id}/${storageName}`]);

    if (deleteError) {
      console.log(deleteError.message);
      return;
    }
  }

  return (
    <div className="min-h-screen max-h-full  flex justify-center items-center mt-14">
      <div className="bg-white  w-full  max-w-6xl p-6 space-y-8">
        <div className="flex justify-center items-center ">
          <Header
            setToEditName={setToEditName}
            toEditName={toEditName}
            user={user}
            setPhotos={setPhotos}
            supabase={supabase}
            fileRef={fileRef}
            deleteFunction={deleteFunction}
          />
        </div>
        {/* Search and Sort Section */}
        <section className="flex justify-between items-center">
          <Filters setSearch={setSearch} setSort={setSort} />
        </section>
        {/* Image Display Section */}
        <section className="bg-gray-200 p-4 max-h-full mb-10">
          <PhotoLists
            supabase={supabase}
            handleClickDelete={handleClickDelete}
            handleClickEdit={handleClickEdit}
            photos={photos}
            setPhotos={setPhotos}
            user={user}
            sort={sort}
            search={search}
          />
        </section>
      </div>
    </div>
  );
};

export default Page;
