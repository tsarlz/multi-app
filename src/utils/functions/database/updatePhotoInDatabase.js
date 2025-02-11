const timestamp = new Date().toISOString();

export const updatePhotoInDatabase = async (
  colName,
  toEditName,
  photoBaseUrl,
  newPhoto,
  file,
  storageName,
  supabase,
  appType = null
) => {
  const photoName = file.name?.split(".")[0];
  const { data, error } = await supabase
    .from("photos")
    .update({
      storage_name: storageName,
      name:
        appType == "food-review" || appType == "pokemon"
          ? photoName
          : file.name,
      url: photoBaseUrl + newPhoto.path,
      updated_at: timestamp,
    })
    .eq(colName, toEditName)
    .select();

  if (error) {
    console.log(error);
    return;
  }

  return { data };
};
