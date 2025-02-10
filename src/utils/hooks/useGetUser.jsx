import { useEffect, useMemo, useState } from "react";
import { createClient } from "../supabase/client";

const supabase = createClient();
const useGetUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        //Handling Error
        if (error) throw new Error(error.message);

        setUser(user); //Set User
      } catch (error) {
        console.log(error.message);
      }
    })(); //Use IIFE t fetch data

    const { subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  return { user, supabase };
};

export default useGetUser;
