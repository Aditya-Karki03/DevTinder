import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { getFeedDataRequest } from "./slice";
import FeedData from "../../components/FeedData";
import { Loader2 } from "lucide-react";

const Feed = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((store: RootState) => store?.feeds?.feedData);
  const loading = useSelector((store: RootState) => store?.feeds?.loading);
  useEffect(() => {
    dispatch(getFeedDataRequest());
  }, []);
  console.log(feeds);
  return (
    <div className="flex flex-grow border border-red-500 py-20">
      {feeds && feeds?.length > 0 ? (
        feeds?.map((feed) => (
          <FeedData
            key={feed._id}
            about={feed.about}
            photoUrl={feed.photoUrl}
            firstName={feed.firstName}
            lastName={feed.lastName}
          />
        ))
      ) : (
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      )}
    </div>
  );
};
export default Feed;
