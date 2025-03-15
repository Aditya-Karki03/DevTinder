import { useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import MessageBox from "./Message/MessageBox";
import { Loader2 } from "lucide-react";

const ListOfFriends = () => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    friendId: "",
  });
  const { friends, loading } = useSelector(
    (store: RootState) => store?.friends
  );

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
      {loading ? (
        <div className="w-full h-full py-4">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto" />
        </div>
      ) : (
        friends?.length == 0 && (
          <p className="p-2">Please make friends to message</p>
        )
      )}
      {friends &&
        friends?.length > 0 &&
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
        ))}
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
