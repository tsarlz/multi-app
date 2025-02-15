import Navbar from "@/components/navbar/Navbar";
import "../globals.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";

const Layout = async ({ children }) => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) {
    redirect("/login");
  }
  return (
    <html>
      <body>
        <Navbar />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
};

export default Layout;
