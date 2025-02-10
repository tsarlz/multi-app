"use client";
import useGetUser from "@/utils/hooks/useGetUser";
import React, { useRef, useState } from "react";
import PhotoLists from "./components/PhotoLists";
import Filters from "./components/Filters";
import AppHeader from "@/components/AppHeader";
import useFetch from "@/utils/hooks/useFetch";
//Database
import { insertPhotoInDatabase } from "@/utils/functions/database/insertPhotoInDatabase";
import { updatePhotoInDatabase } from "@/utils/functions/database/updatePhotoInDatabase";
import { deletePhotoInDatabase } from "@/utils/functions/database/deletePhotoInDatabase";
//Storage
import { uploadInStorage } from "@/utils/functions/storage/uploadInStorage";
import { deleteInStorage } from "@/utils/functions/storage/deleteInStorage";
import AppContainer from "@/components/AppContainer";

const Page = () => {
  const photoBaseUrl = `https://yoclpkzcxjwstelpdytl.supabase.co/storage/v1/object/public/google_drive_photos/`;
  const isUpdating = useRef(false);
  const fileRef = useRef(null);
  const { user, supabase } = useGetUser();
  const [file, setFile] = useState(null);
  const [toEditName, setToEditName] = useState(null);
  const [sort, setSort] = useState("updated_at");
  const [search, setSearch] = useState("");

  // REUSABLE DELETE in STORAGE FUNCTION
  const deletePhotoInStorage = async (toDeletePhoto) =>
    await deleteInStorage("google_drive_photos", toDeletePhoto, supabase, user);

  // REUSABLE UPLOAD in STORAGE FUNCTION
  const UploadPhotoInStorage = async () => {
    const { data } = await uploadInStorage(
      "google_drive_photos",
      file,
      user,
      supabase
    );

    return { data };
  };

  //CREATE && UPDATE
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      if (!file || !user.id || isUpdating.current) return; // Check if there is a user and file added and prevent sending 2 request
      isUpdating.current = true; // block next request if the first 1 didn't finish yet

      //Check if it is UPDATE or ADD photos
      if (toEditName) {
        // DELETE if the Photo is existing in STORAGE
        await deletePhotoInStorage(toEditName);

        // UPLOAD Photo in STORAGE
        const { data: newPhoto } = await UploadPhotoInStorage();

        const storageName = newPhoto.path.split("/")[1]; // Get the Photo name on Storage
        // UPDATE Photo  in DATABASE
        const { data } = await updatePhotoInDatabase(
          "storage_name",
          toEditName,
          photoBaseUrl,
          newPhoto,
          file,
          storageName,
          supabase
        );

        // UPDATE ui
        setPhotos((prev) =>
          prev.map((p) =>
            p.storage_name === toEditName ? { ...p, ...data[0] } : p
          )
        );
      } else {
        //UPLOAD PHOTO IN STORAGE
        const { data: newPhoto } = await UploadPhotoInStorage();

        // Get the storage name
        const storageName = newPhoto?.path.split("/")[1];

        // INSERT Photo in DATABASE
        const { data: insertRes } = await insertPhotoInDatabase(
          "google-drive",
          photoBaseUrl,
          newPhoto,
          file,
          storageName,
          user,
          supabase
        );

        //Update the UI
        setPhotos((prev) => [...prev, ...insertRes]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isUpdating.current = false;
      e.target.reset(); // Clear the input form
      setToEditName(null);
      setFile(null);
    }
  };

  // READ  Fetch Photos
  const { isLoading, photos, setPhotos } = useFetch(
    search,
    user,
    sort,
    supabase,
    "google-drive"
  );

  //EDIT - Initiate Edit
  const handleClickEdit = async (photo) => {
    setToEditName(photo.storage_name);
    fileRef.current.click();
  };

  // DELETE -
  const handleClickDelete = async (photo) => {
    // Delete PHOTO in STORAGE
    await deletePhotoInStorage(photo.storage_name);

    // Delete PHOTO in DATABASE
    await deletePhotoInDatabase(photo, supabase);

    // Update UI
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  };

  return (
    <AppContainer>
      <AppHeader
        title={"Google Drive Lite"}
        formSubmit={handleUpload}
        isEdit={toEditName}
        setFile={setFile}
        fileRef={fileRef}
        file={file}
      />
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
          isLoading={isLoading}
        />
      </section>
    </AppContainer>
  );
};

export default Page;
