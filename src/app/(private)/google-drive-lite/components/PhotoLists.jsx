const PhotoLists = ({
  photos,
  handleClickEdit,
  handleClickDelete,
  isLoading,
}) => {
  return (
    <ul className="grid grid-cols-3 min-h-[50vh]  gap-5 justify-center  place-items-center ">
      {isLoading ? (
        <li>Loading...</li>
      ) : photos.length > 0 ? (
        photos.map((photo) => (
          <li
            key={photo.id}
            className="space-y-3 size-80 max-h-[300px] h-full flex flex-col justify-center"
          >
            {/* <Image src={photo.url} alt={photo.name} /> */}

            <img className="h-[300px] " src={photo.url} alt={photo.name} />
            <div className="flex flex-col justify-start items-start space-y-3">
              <div className="space-y-1">
                <p className="text-xs font-semibold max-w-[300px] break-words truncate">
                  {photo.name}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(photo.updated_at).toLocaleString()}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleClickEdit(photo)}
                  className="h-7 bg-indigo-500 hover:bg-indigo-600 px-3 text-center rounded-lg text-white  text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleClickDelete(photo)}
                  className="h-7 bg-red-500  hover:bg-red-600 px-3 text-center rounded-lg text-white text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))
      ) : (
        <li>No Photo Added yet..</li>
      )}
    </ul>
  );
};

export default PhotoLists;
