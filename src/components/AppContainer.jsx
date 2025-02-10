const AppContainer = ({ children }) => {
  return (
    <div className="min-h-screen max-h-full  flex justify-center items-center mt-8">
      <div className="bg-white w-full h-full  max-w-6xl p-10 space-y-5">
        {children}
      </div>
    </div>
  );
};

export default AppContainer;
