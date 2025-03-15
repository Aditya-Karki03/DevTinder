import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriendsRequest } from "./slice";
import { RootState } from "../../redux/store";
import FriendsProfile from "../../components/FriendsProfile";
import { Loader2 } from "lucide-react";

const Connection = () => {
  const dispatch = useDispatch();
  const { friends, loading } = useSelector(
    (store: RootState) => store?.friends
  );
  useEffect(() => {
    dispatch(getAllFriendsRequest());
  }, [dispatch]);
  return (
    <div className="flex flex-grow flex-col">
      {loading ? (
        <Loader2 className="h-12 w-12 text-white animate-spin m-auto" />
      ) : friends?.length == 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          You don't have any friends, try swiping first or wait to be swiped by
          someone.
        </div>
      ) : (
        friends?.map((friend) => (
          <FriendsProfile key={friend._id} friend={friend} />
        ))
      )}
      {}
    </div>
  );
};
export default Connection;
