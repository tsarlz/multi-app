// Reusable Function -- DELETE PHOTO IN STORAGE
export const deleteInStorage = async (
  bucketName,
  storageName,
  supabase,
  user
) => {
  const { error } = await supabase.storage
    .from(bucketName)
    .remove([`${user.id}/${storageName}`]);

  if (error) {
    console.log(error.message);
    return;
  }
};
