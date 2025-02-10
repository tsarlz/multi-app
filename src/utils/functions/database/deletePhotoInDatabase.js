export const deletePhotoInDatabase = async (photo, supabase) => {
  const { error } = await supabase.from("photos").delete().eq("id", photo.id);

  if (error) {
    console.log(error);
    return;
  }
};
