import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

import { GrPowerReset } from "react-icons/gr";

export const Ratings = ({ setPhotos, photo, supabase, photos }) => {
  // const [rating, setRating] = useState(rate);

  const [hover, setHover] = useState(null);

  //Reusable Function for Update && Reset
  async function updateRating(rate) {
    const { data, error } = await supabase
      .from("photos")
      .update({ rating: rate })
      .eq("id", photo.id)
      .select();

    if (error) {
      console.error("Error updating rating:", error);
      return;
    }

    setPhotos((prev) => prev.map((p) => (p.id == photo.id ? data[0] : p)));
  }

  // RATE a Photo
  function handleRate(rate) {
    updateRating(rate);
  }
  function handReset() {
    updateRating(0);
  }
  return (
    <div className="flex justify-between items-center space-x-1 group">
      <div className="flex space-x-1">
        {[...Array(5)].map((start, i) => {
          const ratingVal = i + 1;

          return (
            <label key={ratingVal} className="flex">
              <input
                value={ratingVal}
                className="hidden"
                type="radio"
                name="rating"
                onClick={() => handleRate(ratingVal)}
              />
              <FaStar
                color={ratingVal <= (hover || photo.rating) ? "ffc107" : "#333"}
                size={22}
                onMouseEnter={() => setHover(ratingVal)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>

      <GrPowerReset
        className=" opacity-0 group-hover:opacity-100"
        onClick={handReset}
        size={26}
      />
    </div>
  );
};
