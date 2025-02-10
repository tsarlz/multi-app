import { v4 as uuidv4 } from "uuid";

//Handle Upload Photo To Storage
export const uploadInStorage = async (bucketName, file, user, supabase) => {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(user.id + "/" + uuidv4(), file);

  if (error) {
    console.log(error.message);
    return;
  }

  return { data };
};
