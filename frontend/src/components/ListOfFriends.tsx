import { useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import MessageBox from "./MessageBox";

const ListOfFriends = () => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    friendId: "",
  });
  const friends = useSelector((store: RootState) => store?.friends?.friends);

  const handleMessage = (
    firstName: string,
    lastName: string,
    photoUrl: string,
    friendId: string
  ) => {
    setShowMessageBox(true);
    setData((prev) => ({
      ...prev,

      firstName,
      lastName,
      photoUrl,
      friendId,
    }));
  };

  return (
    <div className="h-fit w-sm absolute top-8 right-3 z-50 rounded-md border border-white/20 bg-gray-700 ">
      {friends && friends?.length > 0 ? (
        friends.map((friend) => (
          <div
            key={friend._id}
            className=" px-2 py-4 flex items-center justify-between border-b border-white/20 hover:bg-gray-800 cursor-pointer"
            onClick={() =>
              handleMessage(
                friend.firstName,
                friend.lastName,
                friend.photoUrl,
                friend._id
              )
            }
          >
            <img
              src={friend.photoUrl}
              alt="Profile Photo"
              className="w-12 h-12 rounded-full object-fill"
            />
            <span className="text-gray-200 font-bold">
              {friend.firstName} {friend.lastName}
            </span>
          </div>
        ))
      ) : (
        <div className="h-full w-2xl">
          <p>Please make friends to message</p>
        </div>
      )}
      {showMessageBox && (
        <MessageBox
          firstName={data.firstName}
          lastName={data.lastName}
          photoUrl={data.photoUrl}
          friendId={data.friendId}
          setShowMessageBox={setShowMessageBox}
        />
      )}
    </div>
  );
};
export default ListOfFriends;
