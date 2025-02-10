"use client";
import AppContainer from "@/components/AppContainer";
import React, { useState } from "react";

const Page = () => {
  const [file, setFile] = useState(null);
  return (
    <AppContainer>
      <div className="flex justify-center items-center sticky top-[4rem] z-20 bg-white pb-4">
        <header className="text-center ">
          <h1 className="text-2xl text-indigo-500 font-bold text-nowrap text-center">
            Pokemon Review
          </h1>

          <form>
            <div className="flex flex-col justify-center items-center space-y-3 ">
              <input
                type="file"
                className="border-2 border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                Upload Image
              </button>
            </div>
          </form>
        </header>
      </div>
    </AppContainer>
  );
};

export default Page;
