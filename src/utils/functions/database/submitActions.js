"use client";

import { createClient } from "@/utils/supabase/client";
import { adminAuthClient } from "@/utils/supabase/admin";
import { toast } from "react-toastify";

// GetData Utility Function
const getData = async (e) => {
  e.preventDefault();

  const supabase = createClient();
  const formData = new FormData(e.target);

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  return { supabase, data };
};

// Handle User Login
export const handleLogin = async (e, router) => {
  const { supabase, data } = await getData(e);

  const { error } = await supabase.auth.signInWithPassword(data); // POST Login Credentials in Database

  if (error) {
    toast.error(error.message);
    return;
  }
  toast.success("You're logged in.");
  router.push("/");
};

//Handle User Registers
export const handleRegister = async (e, router) => {
  const { supabase, data } = await getData(e); //Invoke GetData Utility Function

  //Check if email already exist
  const { data: adminRes, error: adminResError } =
    await adminAuthClient.listUsers();

  if (adminResError) {
    toast.error("Error checking if user already exist");
    return;
  }

  //Find if the user EMAIL is already in database
  const userExists = adminRes.users.some((user) => user.email === data.email);

  if (!userExists) {
    // If User didn't Exist
    // Register User
    const { error } = await supabase.auth.signUp(data);
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Registration successful");
    router.push("/");
  } else {
    // If user exist

    sessionStorage.setItem("registeredEmail", data.email);

    toast.info("You already have an account please login");
    router.push("/login");
  }
};
