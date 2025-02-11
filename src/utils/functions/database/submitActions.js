"use client";

import { createClient } from "@/utils/supabase/client";
import { adminAuthClient } from "@/utils/supabase/admin";

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

  //Check if email already exist
  const { data: adminRes, error: adminResError } =
    await adminAuthClient.listUsers();

  //Find if the user EMAIL is already in database
  const userExisted = adminRes.users.filter(
    (user) => user.email === data.email
  );

  if (userExisted.length <= 0) {
    // If User didn't Exist

    // Register User
    const { error } = await supabase.auth.signUp(data);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Registration successful, please confirm your email.");
    window.location.href = "https://mail.google.com/";
  } else {
    // If user exist

    //Check if Email is comfirmed
    const isUserEmailConfirmed = userExisted[0].user_metadata.email_verified;
    if (isUserEmailConfirmed) {
      alert("You already have an account please login");
      return;
    } else {
      //Resend Confirmation Email
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: data.email,
        options: {
          emailRedirectTo: "https://mail.google.com/",
        },
      });
      alert("Confirmation email resent. Please check your inbox.");
      window.location.href = "https://mail.google.com/";
    }
  }
};
