const ErrorComponent = () => {
  console.log("Eror comp");
  return (
    <div className="w-screen h-screen bg-gray-800 flex justify-center items-center flex-col">
      <h1 className="font-bold text-3xl text-gray-300">404 NOT FOUND</h1>
      <p className="font-semibold text-xl text-gray-200">
        You are trying to access the route, that does not exist
      </p>
    </div>
  );
};
export default ErrorComponent;
