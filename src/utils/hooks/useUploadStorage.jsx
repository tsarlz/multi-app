import React, { useEffect, useState } from "react";

const useUploadStorage = ({ bucketName, supabase, file, user, uuid }) => {
  const [data, setData] = useState(null); // Get the upload Response
  const [isUploading, setIsUploading] = useState(true);

  useEffect(() => {
    let ignore = false; // avoid to update the state if components unmount
    const upLoadsFile = async () => {
      try {
        if (!supabase) throw new Error("Supabase instance is undefined!");
        if (!ignore) {
          const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(user.id + "/" + uuid, file);
          if (error) throw new Error(error);

          setData(data);
        }
      } catch (error) {
        if (!ignore) {
          console.log(error);
        }
      } finally {
        if (!ignore) {
          setIsUploading(false);
        }
      }
    };

    upLoadsFile();

    return () => {
      //Clean up by setting to false
      ignore = true;
    };
  }, [bucketName, supabase, file, user, uuid]);

  return { data };
};

export default useUploadStorage;
