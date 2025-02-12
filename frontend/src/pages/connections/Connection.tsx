import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriendsRequest } from "./slice";
import { RootState } from "../../redux/store";
import FriendsProfile from "../../components/FriendsProfile";

const Connection = () => {
  const dispatch = useDispatch();
  const friends = useSelector((store: RootState) => store?.friends?.friends);
  const about =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit kjasdfjsadlfjasd asdflore lrem jalwerj  lorem3- asdfa sdflasd flas jdflas dfasd fasdf If start is greater than end, arguments are swapped: (4, 1) = (1, 4). ";
  useEffect(() => {
    dispatch(getAllFriendsRequest());
  }, [dispatch]);
  return (
    <div className="flex flex-grow ">
      {friends?.map((friend) => (
        <FriendsProfile key={friend._id} friend={friend} />
      ))}
    </div>
  );
};
export default Connection;
