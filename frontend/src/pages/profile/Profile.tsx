import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileRequest } from "./slice";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Edit2 } from "lucide-react";
import Modal from "../../components/Modal";

const Profile = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((store: RootState) => store?.profile?.error);
  const userProfileData = useSelector(
    (store: RootState) => store?.profile?.profileData
  );
  //const loading = useSelector((store: RootState) => store?.profile?.loading);
  useEffect(() => {
    dispatch(profileRequest());
    if (error?.errorCode == "401") {
      navigate("/");
    }
  }, [error]);

  //handles the show modal
  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full ">
      <div
        onClick={() => setShowModal(false)}
        className="absolute w-full bg-gradient-to-r from-pink-500 via-orange-500 to-blue-500 h-4/10 "
      ></div>
      <div
        // onClick={() => setShowModal(false)}
        className="h-full flex flex-col flex-grow justify-center items-center p-6"
      >
        <div className="relative z-20 flex flex-col items-center bg-gray-900 rounded-2xl shadow-xl p-8 max-w-2xl w-full space-y-6 transition-all duration-300 hover:shadow-2xl border border-white/10">
          <div className="flex justify-end w-full cursor-pointer ">
            <div
              onClick={handleShowModal}
              className="w-12 h-12 p-3 rounded-full hover:bg-gray-700 flex justify-center items-center"
            >
              <Edit2 />
            </div>
          </div>
          <div className="absolute top-[-19%]  rounded-full shadow-2xl">
            <img
              src={userProfileData?.photoUrl}
              alt="profile photo"
              className="w-36 h-36 rounded-full object-cover border border-white/30 shadow-2xl"
            />
            {/* <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Online
            </div> */}
          </div>

          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="font-bold text-4xl text-gray-300">
              <span>{`${userProfileData?.firstName} ${userProfileData?.lastName}`}</span>
            </div>
            <p className="text-gray-300 text-center max-w-lg leading-relaxed">
              {userProfileData?.about}
            </p>
            <div className="text-gray-200 mt-2">
              <p>{`${userProfileData?.email}`}</p>
            </div>
            <div className="flex gap-6 text-gray-600 font-medium">
              <span className="flex items-center gap-1">
                <span className="text-gray-400">Age:</span>{" "}
                {userProfileData?.age}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-gray-400">Gender:</span>{" "}
                {userProfileData?.gender}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 w-full max-w-lg">
            {userProfileData?.skills.map((skill, index) => (
              <span
                key={skill + index}
                className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      {showModal && <Modal setShowModal={handleShowModal} />}
    </div>
  );
};
export default Profile;
