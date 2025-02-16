import { useFormContext } from "react-hook-form";

const FormPhoto = () => {
  const { register } = useFormContext();
  return (
    <div className="w-full h-full">
      <input
        type="file"
        className="border-dashed w-full h-1/4 rounded-md"
        {...register("image")}
      />
    </div>
  );
};
export default FormPhoto;
