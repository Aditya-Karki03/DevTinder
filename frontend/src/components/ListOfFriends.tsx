import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const ListOfFriends = () => {
  const friends = useSelector((store: RootState) => store?.friends?.friends);

  return (
    <div className="h-full w-sm absolute top-14 right-3 border border-red-300 z-50">
      {friends && friends?.length > 0 ? (
        friends.map((friend) => (
          <div
            key={friend._id}
            className="h-12 border border-b-white/10 p-2 flex items-center justify-between"
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
    </div>
  );
};
export default ListOfFriends;
