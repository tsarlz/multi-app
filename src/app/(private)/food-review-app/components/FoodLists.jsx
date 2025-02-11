// import { Ratings } from "@/components/Ratings";
// import React from "react";
// import EditDeleteIcons from "../../../../components/EditDeleteIcons";

// const FoodLists = ({
//   setPhotos,
//   photo,
//   handleFileOpen,
//   handleDeleteFunction,
//   setFile,
//   photos,
//   supabase,
// }) => {
//   return (
//     <li className="space-y-3 size-80   flex flex-col justify-center w-full h-full border-b-2 border-gray-500 pb-6">
//       {/* Photo */}
//       <div className="w-full flex justify-center items-center relative group">
//         <img
//           // className="h-[250px] w-[500px]"
//           className="h-[300px]"
//           src={photo.url || "placeholder.jpg"}
//         />
//         {/* Image Icons */}
//         <EditDeleteIcons
//           top={18}
//           right={20}
//           translate={5}
//           spaceX={3}
//           setFile={setFile}
//           editFunction={() => handleFileOpen(photo)}
//           deleteFunction={() => handleDeleteFunction(photo)}
//         />
//       </div>
//       {/* Ratings */}
//       <div className="flex flex-col justify-start space-y-3 px-1">
//         <div className="space-y-1">
//           <h3 className=" font-semibold text-sm">{photo.name}</h3>
//           <p className="text-gray-700 text-sm">
//             {new Date(photo.updated_at).toLocaleString()}
//           </p>
//         </div>
//         <Ratings
//           setPhotos={setPhotos}
//           photo={photo}
//           photos={photos}
//           supabase={supabase}
//         />
//       </div>
//     </li>
//   );
// };

// export default FoodLists;
