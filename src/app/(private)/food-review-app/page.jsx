"use client";
import React, { useRef, useState } from "react";
import useGetUser from "@/utils/hooks/useGetUser";
import AppHeader from "@/components/AppHeader";
import Sort from "@/components/Sort";
import Foods from "./components/Foods";
import useFetch from "@/utils/hooks/useFetch";
//Storage
import { uploadInStorage } from "@/utils/functions/storage/uploadInStorage"; // Function to UPLOAD Phot to Storage
import { deleteInStorage } from "@/utils/functions/storage/deleteInStorage"; // Function to DELETE Photo to Storage
//Database
import { insertPhotoInDatabase } from "@/utils/functions/database/insertPhotoInDatabase";
import { updatePhotoInDatabase } from "@/utils/functions/database/updatePhotoInDatabase";
import { deletePhotoInDatabase } from "@/utils/functions/database/deletePhotoInDatabase";
import AppContainer from "@/components/AppContainer";

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
        //DELETE PHOTO TO STORAGE
        await deletePhotoInStorage(toEditName);

        // ADD the new PHOTO to STORAGE
        const { data: newPhoto } = await UploadPhotoInStorage();

        const storageName = newPhoto.path.split("/")[1]; //Get the filename in storage
        //UPDATE THE PHOTO SELECTED FROM THE DATABASE
        const { data, error } = await updatePhotoInDatabase(
          "storage_name",
          toEditName,
          photoBaseUrl,
          newPhoto,
          file,
          storageName,
          supabase,
          "food-review"
        );

        if (error) {
          console.log(error);
          return;
        }

        // Update Image in UI
        setPhotos((prev) =>
          prev.map((p) =>
            p.storage_name === toEditName ? { ...p, ...data[0] } : p
          )
        );
      } else {
        // UPLOAD new PHOTO to STORAGE
        const { data: newPhoto } = await UploadPhotoInStorage();

        //INSERT Photo to Database
        const storageName = newPhoto.path.split("/")[1];
        const { data } = await insertPhotoInDatabase(
          "food-review",
          photoBaseUrl,
          newPhoto,
          file,
          storageName,
          user,
          supabase
        );

        // Update the UI
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

  // READ - CUstom hook to fetch the Photos
  const { isLoading, photos, setPhotos } = useFetch(
    null,
    user,
    sort,
    supabase,
    "food-review"
  );

  // DELETE
  const handleDeleteFunction = async (photo) => {
    // DELETE PHOTO FROM THE STORAGE
    await deletePhotoInStorage(photo.storage_name);

    // DELETE PHOTO FROM THE DATABASE
    await deletePhotoInDatabase(photo, supabase);

    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  };

  function handleFileOpen(photo) {
    fileRef.current.click();
    setToEditName(photo.storage_name);
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
      />
      {/* Sort Input */}
      <section className="flex justify-center items-center">
        <Sort setSort={setSort} />
      </section>
      {/* Contents */}
      <section className="bg-gray-200 p-10 max-h-full mb-10">
        <Foods
          photos={photos}
          supabase={supabase}
          setPhotos={setPhotos}
          setFile={setFile}
          handleDeleteFunction={handleDeleteFunction}
          handleFileOpen={handleFileOpen}
          isLoading={isLoading}
        />
      </section>
    </AppContainer>
  );
};

export default Page;
