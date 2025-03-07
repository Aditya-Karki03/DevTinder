import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriendsRequest } from "./slice";
import { RootState } from "../../redux/store";
import FriendsProfile from "../../components/FriendsProfile";

const Connection = () => {
  const dispatch = useDispatch();
  const friends = useSelector((store: RootState) => store?.friends?.friends);
  useEffect(() => {
    dispatch(getAllFriendsRequest());
  }, [dispatch]);
  return (
    <div className="flex flex-grow flex-col">
      {friends?.map((friend) => (
        <FriendsProfile key={friend._id} friend={friend} />
      ))}
    </div>
  );
};
export default Connection;
