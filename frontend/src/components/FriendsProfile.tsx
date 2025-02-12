import { useState } from "react";
import { IProfileData } from "../Types/types";

interface IFriendsProifle {
  friend: IProfileData;
}

const FriendsProfile = ({ friend }: IFriendsProifle) => {
  const [show, setShowMore] = useState(true);
  const handleMoreLess = () => {
    setShowMore((prev) => !prev);
  };
  return (
    <div className="min-w-3xl mx-auto py-4 ">
      <div className="flex justify-between p-4 rounded-2xl shadow-2xl bg-gray-700 ">
        {/* <div className="w-full h-full flex justify-center items-center border border-red-800 my-auto"> */}
        <img
          src={`${friend?.photoUrl}`}
          alt={`${friend?.firstName} ${friend?.lastName}`}
          className="w-40 h-40 rounded-full my-auto object-fill"
        />
        {/* </div> */}
        <div className=" flex flex-col ">
          <div className="flex justify-between items-end ">
            <div className="">
              <p className="block text-2xl font-semibold text-gray-200">
                {friend?.firstName} {friend?.lastName}
              </p>
              <p className="text-sm">{friend?.email}</p>
              <p className="text-sm  text-gray-100 mt-2">
                Gender: {friend?.gender}
              </p>
              <p className="text-sm  text-gray-100 ">Age: {friend?.age}</p>
            </div>
            <button className="px-3 py-2 bg-blue-500 h-10 rounded-3xl flex justify-center items-center cursor-pointer hover:bg-blue-600">
              Message
            </button>
          </div>
          <div className="max-w-lg text-sm mt-2 ">
            About:
            {friend?.about.length > 50 && !show ? (
              <>
                <p className="inline">{friend?.about.substring(0, 60)} </p>
                <button
                  className="cursor-pointer font-bold"
                  onClick={handleMoreLess}
                >
                  Read More
                </button>
              </>
            ) : (
              <>
                <p className="inline">
                  {friend?.about.substring(0)}
                  {""}
                </p>
                <button
                  className="font-bold cursor-pointer"
                  onClick={handleMoreLess}
                >
                  Read Less
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FriendsProfile;
