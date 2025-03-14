import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { modifyFormSchema, modifyFormSchemaType } from "../schema/schema";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState, useEffect } from "react";
import { editProfileRequest } from "../pages/profile/slice";

interface ModalProps {
  setShowModal: () => void;
}

const Modal = ({ setShowModal }: ModalProps) => {
  const firstName = useSelector(
    (state: RootState) => state?.profile?.profileData?.firstName
  );
  const lastName = useSelector(
    (state: RootState) => state?.profile?.profileData?.lastName
  );
  const age = useSelector(
    (state: RootState) => state?.profile?.profileData?.age
  );
  const about = useSelector(
    (state: RootState) => state?.profile?.profileData?.about
  );
  const photoUrl = useSelector(
    (state: RootState) => state?.profile?.profileData?.photoUrl
  );

  const {
    handleSubmit,
    watch,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<modifyFormSchemaType>({
    resolver: zodResolver(modifyFormSchema),
    defaultValues: {
      firstName,
      lastName,
      age: age?.toString(),
      about,
    },
  });
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setNewPhotoUrl(photoUrl || "");
  }, []);

  const [firstNameVal, lastNameVal, aboutVal, imageVal] = watch([
    "firstName",
    "lastName",
    "about",
    "image",
  ]);

  useEffect(() => {
    const newPhoto: any = getValues("image");
    //create the preview]
    if (newPhoto.length > 0) {
      const photoUrl = URL.createObjectURL(newPhoto?.[0]);
      setNewPhotoUrl(photoUrl);
      //free the memory as soonas the component is unmoounted
      return () => URL.revokeObjectURL(photoUrl);
    }
  }, [imageVal]);

  const onSubmit: SubmitHandler<modifyFormSchemaType> = (data) => {
    if (data?.image.length > 0) {
      const formData = new FormData();
      // formData.append("firstName", data.firstName);
      // formData.append("lastName", data.lastName);
      // formData.append("age", data.age);
      // formData.append("gender", data.gender);
      // formData.append("skills", data.skills);
      // formData.append("about", data.about);
      Object.entries(data).forEach(([key, value]) => {
        // Handle objects differently
        if (typeof value === "object" && value !== null) {
          // If it's the image object
          if (key === "image" && value[0]) {
            formData.append("image", value[0]);
          }
        } else {
          formData.append(key, value);
        }
      });
      dispatch(editProfileRequest(formData));
      setShowModal();
    }
  };

  return (
    <div className="min-w-5xl h-9/10 overflow-hidden flex justify-center items-center absolute z-50 top-[5%] left-[50%] translate-x-[-50%] shadow-2xl">
      <div className="w-full h-full bg-white rounded-3xl  border-black/20border">
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
              encType="multipart/form-data"
            >
              <div className="">
                <label htmlFor="firstName">Firstname: </label>
                <input
                  type="text"
                  {...register("firstName")}
                  onChange={(e) => {
                    setValue("firstName", e.target.value);
                  }}
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
          <div className="text-black h-full ">
            <div className=" h-full">
              <div className="px-2 ">
                <div className="h-8/10 flex  justify-center rounded-md mb-4">
                  <img
                    src={newPhotoUrl}
                    alt="profile-photo"
                    className="object-cover rounded-md block h-[500px] w-full"
                  />
                </div>
                <div className="w-full h-full rounded-md px-1 bg-gray-200 border border-black/20">
                  <div className=" w-full  py-2 flex justify-around ">
                    <div className="w-full  h-12 flex items-center space-x-2 ">
                      <img
                        src={photoUrl}
                        alt="profile-photo"
                        className="w-10 h-10 object-fill rounded-full block"
                      />
                      <p className="font-semibold ">{`${
                        firstNameVal || firstName
                      } ${lastNameVal || lastName}`}</p>
                    </div>
                  </div>

                  <div className="h-20 px-10 flex flex-wrap">
                    {/* {readMore ? (
                      <>
                        <p className="overflow-y-scroll h-full max-w-full">
                          {about1.substring(0, 100)}{" "}
                          <span
                            onClick={handleReadablity}
                            className="font-semibold cursor-pointer"
                          >
                            Read More
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="overflow-y-scroll h-full w-4xl">
                          {about1.substring(0)}
                          <span
                            onClick={handleReadablity}
                            className="font-semibold cursor-pointer"
                          >
                            Read Less
                          </span>
                        </p>
                      </>
                    )} */}
                    <p className="overflow-y-scroll h-full w-4xl">{aboutVal}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
