import { useFormContext } from "react-hook-form";

const FormPersonalInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  //2. Firstname, lastname, age, gender, about, skills
  return (
    <div className="w-full h-full flex flex-col items-center justify-around border border-white/20 bg-white/5 rounded-md py-2">
      <div className="">
        <h2 className="text-xl font-semibold text-center text-gray-200">
          Enter Your Personal Information
        </h2>
      </div>
      <div className="w-full h-full pt-4 flex gap-4 px-3">
        <div className="w-1/2  flex flex-col gap-6">
          <div className="">
            <label htmlFor="firstName" className="block ">
              Firstname:
            </label>
            <input
              type="text"
              {...register("firstName")}
              className={`px-2 py-3 rounded-md ${
                errors?.firstName ? "border-red-500" : "border-blue-500"
              } w-full outline-none`}
            />
          </div>
          <div className="">
            <label htmlFor="age" className="block ">
              Age:
            </label>
            <input
              type="number"
              {...register("age")}
              className={`px-2 py-3 rounded-md ${
                errors?.firstName ? "border-red-500" : "border-blue-500"
              } w-full outline-none`}
            />
          </div>
          <div className="">
            <label htmlFor="skills" className="block">
              Skills:
            </label>
            <input
              type="text"
              {...register("skills")}
              className={`px-2 py-3 rounded-md ${
                errors?.lastName ? "border-red-500" : "border-blue-500"
              } w-full outline-none`}
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-6">
          <div className="">
            <label htmlFor="lastName" className="block">
              Lastname:
            </label>
            <input
              type="text"
              {...register("lastName")}
              className={`px-2 py-3 rounded-md ${
                errors?.lastName ? "border-red-500" : "border-blue-500"
              } w-full outline-none`}
            />
          </div>

          <div className="">
            <label htmlFor="gender" className="block">
              Gender:
            </label>
            <input
              type="text"
              {...register("gender")}
              className={`px-2 py-3 rounded-md ${
                errors?.lastName ? "border-red-500" : "border-blue-500"
              } w-full outline-none`}
            />
          </div>
          <div className="">
            <label htmlFor="about" className="block">
              About:
            </label>
            <textarea
              {...register("about")}
              className={`px-2 py-3 rounded-md ${
                errors?.lastName ? "border-red-500" : "border-blue-500"
              } w-full outline-none`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormPersonalInfo;
