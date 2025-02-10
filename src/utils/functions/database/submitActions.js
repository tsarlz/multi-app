"use client";
import { createClient } from "@/utils/supabase/client";

// GetData Utility Function
async function getData(e) {
  e.preventDefault();

  const supabase = createClient();
  const formData = new FormData(e.target);

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  return { supabase, data };
}

// Handle User Login
export const handleLogin = async (e) => {
  const { supabase, data } = await getData(e);

  const { error } = await supabase.auth.signInWithPassword(data); // POST Login Credentials in Database

  if (error) {
    alert(error.message);
    return;
  }
  window.location.href = "/";
};

//Handle User Registers
export const handleRegister = async (e) => {
  const { supabase, data } = await getData(e); //Invoke GetData Utility Function

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Registration successful, please confirm your email.");
  window.location.href = "https://mail.google.com/";
};
