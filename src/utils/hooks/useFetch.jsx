import React, { useEffect, useState } from "react";

const useFetch = (search, user, sort, supabase, appType) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function fethPhotos() {
      // Fetch the Photos and reviews table
      let query = supabase
        .from("photos")
        .select("name, url, updated_at, id, storage_name,rating")
        .eq("user_id", user?.id)
        .eq("app_type", appType);

      try {
        if (search) query = query.ilike("name", `%${search}%`);
        if (sort === "byName") {
          query = query.order("name", {
            ascending: true,
          });
        } else if (sort === "byDate") {
          query = query.order("updated_at", { ascending: false });
        }

        const { data, error } = await query;

        if (error) throw new Error(error);
        setPhotos(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fethPhotos();
  }, [user, search, sort]);

  return { isLoading, photos, setPhotos };
};

export default useFetch;
