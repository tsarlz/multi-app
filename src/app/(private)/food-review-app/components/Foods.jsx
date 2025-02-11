// import React from "react";
// import FoodLists from "./FoodLists";

// const Foods = ({
//   isLoading,
//   handleFileOpen,
//   handleDeleteFunction,
//   setFile,
//   setPhotos,
//   photos,
//   supabase,
// }) => {
//   return (
//     <ul className="  grid grid-cols-3 gap-5 ">
//       {isLoading ? (
//         <li>Loading....</li>
//       ) : photos.length > 0 ? (
//         photos.map((photo) => (
//           <FoodLists
//             key={photo.id}
//             setFile={setFile}
//             photo={photo}
//             photos={photos}
//             supabase={supabase}
//             setPhotos={setPhotos}
//             handleFileOpen={handleFileOpen}
//             handleDeleteFunction={handleDeleteFunction}
//           />
//         ))
//       ) : (
//         <li>No Food photo to review yet.</li>
//       )}
//     </ul>
//   );
// };

// export default Foods;
