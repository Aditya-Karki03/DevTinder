import { Edit2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { ISignUpFormData } from "../Types/types";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "../schema/schema";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormData>({
    resolver: zodResolver(registerFormSchema),
    mode: "onSubmit",
  });
  const onSubmit = (data: ISignUpFormData) => {
    console.log("Hello");
    // const formData = new FormData();
    console.log(data);
  };
  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg space-y-6 border border-white/20"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-white"
          >
            First name
          </label>
          <input
            type="text"
            {...register("firstName")}
            placeholder="First Name"
            className={`w-full px-2 py-3 bg-white/5 border border-white/10 rounded-md outline-none transition-all duration-200 placeholder:text-white/50 text-white ${
              errors.firstName
                ? "focus:border-red-500"
                : "focus:border-blue-500"
            }`}
          />
          {errors?.firstName && (
            <p className="text-sm text-red-400">{errors.firstName?.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-white"
          >
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName")}
            placeholder="Last Name"
            className={`w-full px-2 py-3 bg-white/5 border border-white/10 rounded-md outline-none transition-all duration-200 placeholder:text-white/50 text-white ${
              errors.lastName ? "focus:border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors?.lastName && (
            <p className="text-sm text-red-400">{errors.lastName?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email:
          </label>
          <input
            type="text"
            {...register("email")}
            placeholder="emails"
            className={`w-full px-2 py-3 bg-white/5 border border-white/10 rounded-md outline-none transition-all duration-200 placeholder:text-white/50 text-white ${
              errors.email ? "focus:border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors?.email && (
            <p className="text-sm text-red-400">{errors.email?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="about"
            className="block text-sm font-medium text-white"
          >
            Tell us about yourself:
          </label>
          <textarea
            {...register("about")}
            rows={4}
            placeholder="Share something about yourself..."
            className={`w-full px-2 py-3 bg-white/5 border border-white/10 rounded-md outline-none transition-all duration-200 placeholder:text-white/50 text-white ${
              errors.about ? "focus:border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors?.about && (
            <p className="text-sm text-red-400">{errors.about?.message}</p>
          )}
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-white"
          >
            Skills
          </label>
          <input
            type="text"
            {...register("skills")}
            placeholder="e.g., JavaScript, React, Node.js (comma separated)"
            className={`w-full px-2 py-3 bg-white/5 border border-white/10 rounded-md outline-none transition-all duration-200 placeholder:text-white/50 text-white ${
              errors.skills ? "focus:border-red-500" : "focus:border-blue-500"
            }`}
          />
          {errors?.skills && (
            <p className="text-sm text-red-400">{errors.skills?.message}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div className="space-y-2">
          <label
            htmlFor="photo"
            className="flex items-center gap-2 text-sm font-medium text-white cursor-pointer group"
          >
            <div className="p-2 border border-white/20 rounded-lg group-hover:border-white/50 transition-colors duration-200 bg-white/5">
              <Edit2 className="w-5 h-5 text-white/70 group-hover:text-white" />
            </div>
            <span>Upload Photo</span>
          </label>
          <input
            type="file"
            id="photo"
            accept=".png, .jpg, .jpeg, .svg"
            className="hidden"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600  text-white font-medium py-2 px-4 rounded-lg focus:ring-4 focus:ring-white/30 transition-all duration-200 border border-white/20 hover:cursor-pointer"
        >
          Sign up
        </button>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to={"/"} className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};
export default Form;
