import { useFormContext } from "react-hook-form";

const FormEmail = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 border border-white/20 bg-white/5 rounded-md py-2">
      <div className="">
        <h2 className="text-xl font-semibold text-center text-gray-200">
          Enter Your Email & Click on Verify
        </h2>
      </div>
      <div className="w-1/2 flex flex-col gap-3">
        <div className="">
          <label htmlFor="email" className="block ">
            Email:
          </label>
          <input
            type="text"
            {...register("email")}
            className={`px-2 py-3 rounded-md ${
              errors?.email ? "border-red-500" : "border-blue-500"
            } w-full outline-none`}
          />
        </div>
        <div className="">
          <label htmlFor="password" className="block">
            Password:
          </label>
          <input
            type="password"
            {...register("password")}
            className={`px-2 py-3 rounded-md ${
              errors?.password ? "border-red-500" : "border-blue-500"
            } w-full outline-none`}
          />
        </div>
      </div>
    </div>
  );
};
export default FormEmail;
