"use client";
import AppContainer from "@/components/AppContainer";
import AppHeader from "@/components/AppHeader";
import React, { useRef, useState } from "react";
import Filters from "../../../components/Filters";
import useGetUser from "@/utils/hooks/useGetUser";
import useFetch from "@/utils/hooks/useFetch";
import ReviewContents from "@/components/ReviewContents";
import { uploadInStorage, deleteInStorage } from "@/utils/functions/storage";
import {
  insertPhotoInDatabase,
  updatePhotoInDatabase,
  deletePhotoInDatabase,
} from "@/utils/functions/database";

const Page = () => {
  const photoBaseUrl =
    "https://yoclpkzcxjwstelpdytl.supabase.co/storage/v1/object/public/pokemon_photos/";
  const { user, supabase } = useGetUser();
  const fileRef = useRef(null);
  const isUpdating = useRef(false);
  const [file, setFile] = useState(null);
  const [toEditName, setToEditName] = useState(null);
  const [sort, setSort] = useState("updated_at");
  const [search, setSearch] = useState("");

  // REUSABLE DELETE in STORAGE FUNCTION
  const deletePhotoInStorage = async (toDeletePhoto) =>
    await deleteInStorage("google_drive_photos", toDeletePhoto, supabase, user);

  // REUSABLE UPLOAD in STORAGE FUNCTION
  const uploadPhotoInStorage = async () => {
    const { data } = await uploadInStorage(
      "pokemon_photos",
      file,
      user,
      supabase
    );

    return { data };
  };

  //CREATE AND UPDATE
  const handleUploadAndUpdate = async (e) => {
    e.preventDefault();

    try {
      if (!file || !user || isUpdating.current) return;
      isUpdating.current = true;

      // Check if UPDATE or UPLOAD
      if (toEditName) {
        // UPDATE

        //DELETE from STORAGE the PHOTO to UPDATE
        await deletePhotoInStorage(toEditName);

        //UPLOAD THE NEW PHOTO
        const { data: updatedPhoto } = await uploadPhotoInStorage();

        // Get the PHOTO storage name
        const storageName = updatedPhoto.path.split("/")[1];

        // INSERT THE UPDATED PHOTO in DATABASE
        const { data } = await updatePhotoInDatabase(
          "storage_name",
          toEditName,
          photoBaseUrl,
          updatedPhoto,
          file,
          storageName,
          supabase,
          "pokemon"
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
        const { data: newImage } = await uploadPhotoInStorage();

        // Get the storage name
        const storageName = newImage.path.split("/")[1];

        // INSERT PHOTO TO DATABASE
        const { data: insertRes } = await insertPhotoInDatabase(
          "pokemon",
          photoBaseUrl,
          newImage,
          file,
          storageName,
          user,
          supabase
        );

        //Update UI
        setPhotos((prev) => [...prev, ...insertRes]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isUpdating.current = false;
      e.target.reset();
      setFile(null);
    }
  };

  // READ - Custom Hooks for DATA FETChING
  const { isLoading, photos, setPhotos } = useFetch(
    search,
    user,
    sort,
    supabase,
    "pokemon", // Filter the photos App Type
    "photos"
  );

  //DELETE
  const handleDeleteFunction = async (photo) => {
    // DELETE in Storage
    await deletePhotoInStorage(photo.storage_name);

    // DELETE in DATABASE
    await deletePhotoInDatabase(photo, supabase);

    //UPDATE UI
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
  };

  // INITIALIZE Edit
  const handleFileOpen = async (photo) => {
    fileRef.current.click();
    setToEditName(photo.storage_name);
  };

  return (
    <AppContainer>
      <AppHeader
        title={"Pokemon Review"}
        formSubmit={handleUploadAndUpdate}
        isEdit={toEditName}
        setFile={setFile}
        fileRef={fileRef}
        file={file}
        buttonText={"Pokemon"}
      />
      {/* Search and Sort Section */}
      <section className="flex justify-between items-center">
        <Filters setSearch={setSearch} setSort={setSort} />
      </section>
      {/* Pokemon Display Section */}
      <section className="bg-gray-200 p-10 max-h-full mb-10">
        <ReviewContents
          photos={photos}
          supabase={supabase}
          setPhotos={setPhotos}
          setFile={setFile}
          handleDeleteFunction={handleDeleteFunction}
          handleFileOpen={handleFileOpen}
          isLoading={isLoading}
          noDataText={"No pokemon to review yet."}
        />
      </section>
    </AppContainer>
  );
};

export default Page;
