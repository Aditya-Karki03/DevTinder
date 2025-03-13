import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getFeedDataRequest } from "./slice";
import FeedData from "../../components/FeedData";
import { Loader2 } from "lucide-react";
import { IUserProfile } from "../../Types/types";

const Feed = () => {
  const [rightSwipe, setRightSwipe] = useState(0);
  const [feeds, setFeed] = useState<IUserProfile[] | null>(null);
  const dispatch = useDispatch();
  const feedsData = useSelector((store: RootState) => store?.feeds?.feedData);
  // const loading = useSelector((store: RootState) => store?.feeds?.loading);
  useEffect(() => {
    // dispatch(getFeedDataRequest());
    // if (feeds) dispatch(manipulateFeedData(feeds));
    dispatch(getFeedDataRequest());
  }, []);
  useEffect(() => {
    setFeed(feedsData);
  }, [feedsData]);
  // useEffect(() => {
  //   if (isSwiped) {
  //     const newFeed = feedsData?.filter((data) => data._id !== id);
  //     dispatch(manipulateFeedData(newFeed || []));
  //   }
  // }, [isSwiped]);

  //optimize the below to send only 1 api call as of now it is making multiple

  return (
    <div
      className={`flex w-screen flex-grow py-20 overflow-hidden transition-colors ease-in-out duration-300 ${
        rightSwipe > 0 &&
        "bg-linear-to-r from-rose-500/80 via-red-400/80 to-pink-500/80"
      } ${
        rightSwipe < 0 &&
        "bg-linear-to-l from-blue-500/80 via-blue-400/80 to-blue-600/80"
      } `}
    >
      <div className="w-full h-full grid place-items-center">
        {feedsData && feedsData?.length > 0 ? (
          feeds?.map((feed) => (
            <FeedData
              key={feed._id}
              id={feed._id}
              about={feed.about}
              photoUrl={feed.photoUrl}
              firstName={feed.firstName}
              lastName={feed.lastName}
              setRightSwipe={setRightSwipe}
              //also send feeds and setFeeds to the FeedData component
              feeds={feeds}
              setFeed={setFeed}
            />
          ))
        ) : (
          <p className="text-lg">
            We're sorry, these were all the users we had. Onboarding more users.
          </p>
        )}
      </div>
    </div>
  );
};
export default Feed;
