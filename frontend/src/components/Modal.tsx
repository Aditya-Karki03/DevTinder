import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { useForm } from "react-hook-form";
import { modifyFormSchema } from "../schema/schema";

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
  } = useForm({
    resolver: zodResolver(modifyFormSchema),
  });
  return (
    <div className="min-w-5xl h-8/10 flex justify-center items-center absolute z-50 top-[10%] left-[50%] translate-x-[-50%] shadow-2xl">
      <div className="w-full h-full bg-white rounded-3xl">
        <div className="flex w-full justify-end p-3 ">
          <CircleX
            onClick={setShowModal}
            className="text-black cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-2 h-full">
          <div className="text-black border-dashed border-r-2  h-full">
            <form className="px-4 space-y-4">
              <div className="">
                <label htmlFor="firstName">Firstname: </label>
                <input
                  type="text"
                  className="py-2 px-1 rounded-md outline-none w-full text-md"
                />
              </div>
              <div className="">
                <label htmlFor="firstName">Lastname: </label>
                <input
                  type="text"
                  className="py-2 px-1 rounded-md outline-none w-full text-md"
                />
              </div>
              <div className="">
                <label htmlFor="firstName">Age: </label>
                <input
                  type="number"
                  className="py-2 px-1 rounded-md outline-none w-full text-md"
                />
              </div>
              <div className="">
                <label htmlFor="firstName">Gender: </label>
                <input
                  type="text"
                  className="py-2 px-1 rounded-md outline-none w-full text-md"
                />
              </div>
              <div className="">
                <label htmlFor="firstName">Skills: </label>
                <input
                  type="text"
                  className="py-2 px-1 rounded-md outline-none w-full text-md"
                />
              </div>
              <div className="">
                <label htmlFor="firstName">About: </label>
                <textarea className="py-2 px-1 rounded-md outline-none w-full text-md" />
              </div>
              <div className="w-full h-full">
                <input
                  type="file"
                  name=""
                  id=""
                  className="border border-dashed w-full h-full rounded-md py-8 px-7"
                />
              </div>
            </form>
          </div>
          <div className="text-black h-full">hello world</div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
