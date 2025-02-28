import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { useForm } from "react-hook-form";
import { modifyFormSchema, modifyFormSchemaType } from "../schema/schema";

interface ModalProps {
  setShowModal: () => void;
}

const Modal = ({ setShowModal }: ModalProps) => {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    getValues,
  } = useForm<modifyFormSchemaType>({
    resolver: zodResolver(modifyFormSchema),
  });

  const onSubmit = (data: modifyFormSchemaType) => {
    console.log(data);
  };
  return (
    <div className="min-w-5xl flex justify-center items-center absolute z-50 top-[5%] left-[50%] translate-x-[-50%] shadow-2xl">
      <div className="w-full h-full bg-white rounded-3xl">
        <div className="flex w-full justify-end p-3 ">
          <CircleX
            onClick={setShowModal}
            className="text-black cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-2 h-full">
          <div className="text-black border-dashed border-r-2  h-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-4 space-y-2 overflow-y-scroll pb-4"
            >
              <div className="">
                <label htmlFor="firstName">Firstname: </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className={`py-2 px-1 rounded-md outline-none w-full text-md ${
                    errors.firstName && "border border-red-500"
                  }`}
                />
                {errors?.firstName && (
                  <p className="text-sm text-red-500">
                    {errors?.firstName?.message}
                  </p>
                )}
              </div>
              <div className="">
                <label htmlFor="lastName">Lastname: </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className={`py-2 px-1 rounded-md outline-none w-full text-md ${
                    errors?.lastName && "border border-red-500"
                  }`}
                />
                {errors?.lastName && (
                  <p className="text-sm text-red-500">
                    {errors?.lastName?.message}
                  </p>
                )}
              </div>
              <div className="">
                <label htmlFor="age">Age: </label>
                <input
                  type="number"
                  {...register("age")}
                  className={`py-2 px-1 rounded-md outline-none w-full text-md ${
                    errors.age && "border border-red-500"
                  }`}
                />
                {errors?.age && (
                  <p className="text-sm text-red-500">{errors?.age?.message}</p>
                )}
              </div>
              <div className="">
                <label htmlFor="gender">Gender: </label>
                <input
                  type="text"
                  {...register("gender")}
                  className={`py-2 px-1 rounded-md outline-none w-full text-md ${
                    errors?.gender && "border border-red-500"
                  }`}
                />
                {errors?.gender && (
                  <p className="text-sm text-red-500">
                    {errors?.gender?.message}
                  </p>
                )}
              </div>
              <div className="">
                <label htmlFor="skills">Skills: </label>
                <input
                  type="text"
                  {...register("skills")}
                  className={`py-2 px-1 rounded-md outline-none w-full text-md ${
                    errors?.skills && "border border-red-500"
                  }`}
                />
                {errors?.firstName && (
                  <p className="text-sm text-red-500">
                    {errors?.skills?.message}
                  </p>
                )}
              </div>
              <div className="">
                <label htmlFor="about">About: </label>
                <textarea
                  {...register("about")}
                  className={`py-2 px-1 rounded-md outline-none w-full text-md ${
                    errors?.about && "border border-red-500"
                  }`}
                />
                {errors?.about && (
                  <p className="text-sm text-red-500">
                    {errors?.about?.message}
                  </p>
                )}
              </div>
              <div className="w-full h-full">
                <label htmlFor="image">Profile Photo:</label>
                <input
                  type="file"
                  {...register("image")}
                  className="border border-dashed w-full h-full rounded-md py-6 px-7"
                />
                {errors?.image && (
                  <p className="text-sm text-red-500">
                    {errors?.image?.message?.toString()}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-center py-2 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="text-black h-full">hello world</div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
