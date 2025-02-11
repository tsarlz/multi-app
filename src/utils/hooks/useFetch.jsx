import React, { useEffect, useState } from "react";

const useFetch = (search, user, sort, supabase, appType, fetch) => {
  const [photos, setPhotos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function fetchPhotos() {
      setIsLoading(true);
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

    async function fetchNotes() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("notes")
          .select("title, content, user_id, id")
          .eq("user_id", user.id);

        if (error) throw new Error(error);

        setNotes(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (fetch == "photos") {
      fetchPhotos();
    } else {
      fetchNotes();
    }
  }, [user, search, sort, fetch]);

  return { isLoading, photos, setPhotos, notes, setNotes };
};

export default useFetch;
