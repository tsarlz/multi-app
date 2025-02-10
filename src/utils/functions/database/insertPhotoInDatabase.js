export const insertPhotoInDatabase = async (
  appType,
  photoBaseUrl,
  newPhoto,
  file,
  storageName,
  user,
  supabase
) => {
  const photoName = file.name?.split(".")[0];
  const { data, error } = await supabase
    .from("photos")
    .insert([
      {
        user_id: user.id,
        storage_name: storageName,
        name:
          appType == "food-review" || appType == "pokemon"
            ? photoName
            : file.name,
        url: photoBaseUrl + newPhoto.path,
        app_type: appType,
      },
    ])
    .select();

  if (error) {
    console.log(error.message);
    return;
  }

  return { data };
};
