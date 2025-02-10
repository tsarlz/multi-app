"use server";
import Link from "next/link";
import { handleLogin } from "@/utils/functions/database/submitActions"; // Import Function that handles uUser login
import Form from "@/components/Form";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login
        </h2>

        {/* Import Dynamic Form */}
        <Form action={handleLogin} />

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            href="/register"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
