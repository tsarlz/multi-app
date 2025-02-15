"use server";
import Link from "next/link";
import Form from "@/components/Form"; // Dynamic Form
import { handleRegister } from "@/utils/functions/database/submitActions"; // Import Function that handles User Registration

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Register
        </h2>
        {/* Import Dynamic Form */}
        <Form action={handleRegister} type={"register"} />

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link
            href="/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
