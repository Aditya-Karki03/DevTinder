import Form from "../../components/Form";

const Register = () => {
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="flex h-10/12 flex-col bg-white/10 rounded-2xl  p-4 ">
        <div className="text-center space-y-2 my-5">
          <h2 className="font-extrabold text-4xl text-gray-300">
            Welcome to Developer Tinder!
          </h2>
          <p className="text-gray-200 text-xl">
            Connect with like-minded developers, collaborate on exciting
            projects, and expand your network.
          </p>
        </div>
        <div className="h-full ">
          <Form />
        </div>
      </div>
    </div>
  );
};
export default Register;
