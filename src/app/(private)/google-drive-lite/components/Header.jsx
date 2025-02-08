import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Header = ({
  fileRef,
  deleteFunction,
  supabase,
  user,
  toEditName,
  setPhotos,
  setToEditName,
}) => {
  const photoBaseUrl = `https://hysmorvrphjfofelnwtn.supabase.co/storage/v1/object/public/google_drive_photos/`;
  const [file, setFile] = useState(null);
  const isLoading = useRef(false);

  //   Photo Upload and Update
  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      if (!file || !user.id || isLoading.current) return; // Check if there is a user and file added and prevent sending 2 more request
      isLoading.current = true; // block next request if the first 1 didn't finish yet

      if (toEditName) {
        deleteFunction(toEditName); // Delete if the File is existing

        const { data: newPhoto, error: newPhotoErr } = await supabase.storage //Upload the selected file/photo
          .from("google_drive_photos")
          .upload(`${user.id}/${uuidv4()}`, file);

        if (newPhotoErr) throw new Error(newPhotoErr);

        const storageName = newPhoto.path.split("/")[1]; // Get the Photo name on Storage
        const timestamp = new Date();

        const { data, error } = await supabase // Update Photo Detail in Database
          .from("photos")
          .update({
            name: file.name,
            storage_name: storageName,
            url: photoBaseUrl + user.id + "/" + storageName,
            updated_at: timestamp.toLocaleString(),
          })
          .eq("storage_name", toEditName)
          .select();

        if (error) {
          console.log(error);
          return;
        }
        // UPDATE ui
        setPhotos((prev) =>
          prev.map((p) =>
            p.storage_name === toEditName ? { ...p, ...data[0] } : p
          )
        );
      } else {
        //Upload photo to Storage
        const { data: imgPath, error } = await supabase.storage
          .from("google_drive_photos")
          .upload(user.id + "/" + uuidv4(), file);

        if (error) {
          console.log(error);
          return;
        } else {
          const storageName = imgPath?.path.split("/")[1]; // Get the storage name

          // Insert Photo Details in Database
          const { data, error } = await supabase
            .from("photos")
            .insert([
              {
                user_id: user?.id,
                name: file.name,
                url: photoBaseUrl + imgPath.path,
                storage_name: storageName,
                app_type: "google-drive",
              },
            ])
            .select();
          // Handle Error
          if (error) {
            console.log(error.message);
            return;
          }
          //Update the UI
          setPhotos((prev) => [...prev, ...data]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.current = false;
      e.target.reset();
      setToEditName(null);
      setFile(null);
    }
  };
  return (
    <header className="text-center space-y-3">
      <h1 className="text-2xl text-indigo-500 font-bold text-nowrap text-center">
        Google Drive Lite
      </h1>

      <form onSubmit={handleUpload}>
        <div className="flex flex-col justify-center items-center space-y-3 ">
          <input
            ref={fileRef} // for Custom Select File Button
            // value={typeof file === "string" ? "" : file?.name}
            type="file"
            className="border-2 border-gray-300 rounded-md"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type="submit"
            className="px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {toEditName ? "Edit" : "Upload"} Image
          </button>
        </div>
      </form>
    </header>
  );
};

export default Header;
