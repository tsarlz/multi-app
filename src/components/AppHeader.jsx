import React from "react";

const AppHeader = ({ title, formSubmit, setFile, fileRef, isEdit, file }) => {
  return (
    <div className="flex justify-center items-center sticky top-[4rem] z-20 bg-white pb-4">
      <header className="text-center ">
        <h1 className="text-2xl text-indigo-500 font-bold text-nowrap text-center">
          {title}
        </h1>

        <form onSubmit={formSubmit}>
          <div className="flex flex-col justify-center items-center space-y-3 ">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              ref={fileRef}
              type="file"
              className="border-2 border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              {file && isEdit ? "Update" : "Upload"} Image
            </button>
          </div>
        </form>
      </header>
    </div>
  );
};

export default AppHeader;
