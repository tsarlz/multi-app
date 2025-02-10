"use client";
import useGetUser from "@/utils/hooks/useGetUser";
import { adminAuthClient } from "@/utils/supabase/admin";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavbarButtons = () => {
  const { user, supabase } = useGetUser();
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Logout clicked");
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw new Error(error);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (!confirm("Are you sure you want to delete your account?")) return; // Return the function if not confirm

      const { data, error } = await adminAuthClient.deleteUser(user.id);

      if (error) throw new Error(error);

      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return !user ? (
    <>
      <Link
        href="/login"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Register
      </Link>
    </>
  ) : (
    <>
      <button
        onClick={handleLogout}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Logout
      </button>
      <button
        onClick={handleDeleteUser}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Delete
      </button>
    </>
  );
};

export default NavbarButtons;
