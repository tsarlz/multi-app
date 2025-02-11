import React from "react";
import ContentLists from "./ContentLists";

const ReviewContents = ({
  isLoading,
  handleFileOpen,
  handleDeleteFunction,
  setFile,
  setPhotos,
  photos,
  supabase,
  noDataText,
}) => {
  return (
    <ul className="  grid grid-cols-3 gap-5 ">
      {isLoading ? (
        <li>Loading....</li>
      ) : photos.length > 0 ? (
        photos.map((photo) => (
          <ContentLists
            key={photo.id}
            setFile={setFile}
            photo={photo}
            photos={photos}
            supabase={supabase}
            setPhotos={setPhotos}
            handleFileOpen={handleFileOpen}
            handleDeleteFunction={handleDeleteFunction}
          />
        ))
      ) : (
        <li>{noDataText}</li>
      )}
    </ul>
  );
};

export default ReviewContents;
