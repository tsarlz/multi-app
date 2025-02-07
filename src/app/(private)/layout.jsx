import Navbar from "@/components/Navbar";
import "../globals.css";

const Layout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default Layout;
