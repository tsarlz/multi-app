"use client";
import React, { useRef, useState } from "react";
import useGetUser from "@/utils/hooks/useGetUser";
import AppHeader from "@/components/AppHeader";
import Sort from "@/components/Sort";
import useFetch from "@/utils/hooks/useFetch";
import { uploadInStorage, deleteInStorage } from "@/utils/functions/storage";
import {
  insertPhotoInDatabase,
  updatePhotoInDatabase,
  deletePhotoInDatabase,
} from "@/utils/functions/database";
import AppContainer from "@/components/AppContainer";
import ReviewContents from "@/components/ReviewContents";

const Page = () => {
  const { user, supabase } = useGetUser();
  const fileRef = useRef(null);
  const isUpdating = useRef(false);
  const [file, setFile] = useState(null);
  const [toEditName, setToEditName] = useState(null);
  const [sort, setSort] = useState("updated_at");
  const photoBaseUrl =
    "https://yoclpkzcxjwstelpdytl.supabase.co/storage/v1/object/public/food_review_photos/";

  // REUSABLE DELETE in STORAGE FUNCTION
  const deletePhotoInStorage = async (toDeletePhoto) =>
    await deleteInStorage("food_review_photos", toDeletePhoto, supabase, user);

  // REUSABLE UPLOAD in STORAGE FUNCTION
  const UploadPhotoInStorage = async () => {
    const { data } = await uploadInStorage(
      "food_review_photos",
      file,
      user,
      supabase
    );

    return { data };
  };

  // CREATE - Handles Uploads and Update of Photo only
  const handleUploadAndUpdate = async (e) => {
    e.preventDefault();

    try {
      if (!user || !file || isUpdating.current) return; // Block if no file selected and no user avoid
      isUpdating.current = true; // block next request if the first 1 didn't finish yet

      if (toEditName) {
        // UPDATE

        //DELETE from STORAGE the PHOTO to UPDATE
        await deletePhotoInStorage(toEditName);

        // ADD the new PHOTO to STORAGE
        const { data: updatedPhoto } = await UploadPhotoInStorage();

        // Get the PHOTO storage name
        const storageName = updatedPhoto.path.split("/")[1];

        //UPDATE THE PHOTO SELECTED FROM THE DATABASE
        const { data, error } = await updatePhotoInDatabase(
          "storage_name",
          toEditName,
          photoBaseUrl,
          updatedPhoto,
          file,
          storageName,
          supabase,
          "food-review"
        );

        // Update UI
        setPhotos((prev) =>
          prev.map((p) =>
            p.storage_name === toEditName ? { ...p, ...data[0] } : p
          )
        );
      } else {
        // UPLOAD

        // UPLOAD PHOTO TO STORAGE
        const { data: newPhoto } = await UploadPhotoInStorage();

        // Get the storage name
        const storageName = newPhoto.path.split("/")[1];

        // INSERT PHOTO TO DATABASE
        const { data } = await insertPhotoInDatabase(
          "food-review",
          photoBaseUrl,
          newPhoto,
          file,
          storageName,
          user,
          supabase
        );

        // Update UI
        setPhotos((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isUpdating.current = false;
      setFile(null);
      e.target.reset();
    }
  };

  // READ - Custom Hooks for DATA FETChING
  const { isLoading, photos, setPhotos } = useFetch(
    null,
    user,
    sort,
    supabase,
    "food-review",
    "photos"
  );

  // DELETE
  const handleDeleteFunction = async (photo) => {
    // DELETE PHOTO FROM THE STORAGE
    await deletePhotoInStorage(photo.storage_name);

    // DELETE PHOTO FROM THE DATABASE
    await deletePhotoInDatabase(photo, supabase);

    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  };

  // INITIALIZE EDIT
  function handleFileOpen(photo) {
    setToEditName(photo.storage_name);
    fileRef.current.click();
  }
  return (
    <AppContainer>
      <AppHeader
        title={"Food Review"}
        formSubmit={handleUploadAndUpdate}
        isEdit={toEditName}
        setFile={setFile}
        fileRef={fileRef}
        file={file}
        buttonText={"Food"}
      />
      {/* Sort Input */}
      <section className="flex justify-center items-center">
        <Sort setSort={setSort} />
      </section>
      {/* Contents */}
      <section className="bg-gray-200 p-10 max-h-full mb-10">
        <ReviewContents
          photos={photos}
          supabase={supabase}
          setPhotos={setPhotos}
          setFile={setFile}
          handleDeleteFunction={handleDeleteFunction}
          handleFileOpen={handleFileOpen}
          isLoading={isLoading}
          noDataText={"No food to review yet."}
        />
      </section>
    </AppContainer>
  );
};

export default Page;
