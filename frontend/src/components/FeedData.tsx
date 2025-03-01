import { Dispatch, SetStateAction, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { connectionRejectionRequest } from "../pages/feed/slice";
import { useDispatch } from "react-redux";
import { IFeed, IUserProfile } from "../Types/types";

const FeedData = ({
  about,
  photoUrl,
  setRightSwipe,
  setFeed,
  feeds,
  id,
}: IFeed) => {
  const dispatch = useDispatch();
  const [readMore, setReadMore] = useState(false);
  //very similar to useState, here value of x is set to 0
  //the x defines, how mch we moved into x direction in the browser
  const x = useMotionValue(0);
  //useMotionValueEvent tracks how much it moves in the x direction
  useMotionValueEvent(x, "change", (latest) => {
    // console.log("121212");
    setRightSwipe(latest);
  });

  //useTransform hook will let me transform my motion div to something
  //if my x=-150 than opacity=0, if x=0 than opacity=1, if x=150 than opacity=0
  const opacity = useTransform(x, [-250, 0, 250], [0, 1, 0]);
  const rotate = useTransform(x, [-250, 250], [-20, 20]);
  // const backgroundColor = useTransform(x, [-10, 10], ["white", "blue"]);

  //function which tell what will happen when drag is completed
  const handleDragEnd = () => {
    // below x is a motion value, so we can get the value of x by x.get()
    if (x.get() > 150) {
      //TODO:get rid of the front card
      const status = "send";
      dispatch(connectionRejectionRequest({ status, id }));
      //once left or right swiped the card, set the rightSwipe to 0
      setRightSwipe(0);
      setFeed((prev) => prev && prev.filter((V) => V._id !== id));
    } else if (x.get() < -150) {
      {
        const status = "ignore";
        dispatch(connectionRejectionRequest({ status, id }));
        //once left or right swiped the card, set the rightSwipe to 0
        // setRightSwipe(0);
        setFeed((prev) => prev && prev.filter((V) => V._id !== id));
      }
    }
  };
  return (
    <motion.div
      style={{ gridRow: 1, gridColumn: 1, x, opacity, rotate }}
      className="mx-auto border bg-black border-white/10 h-full w-md rounded-2xl overflow-hidden relative hover:cursor-grab active:cursor-grabbing "
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <img
        draggable={false}
        src={`${photoUrl}`}
        alt="photo"
        className="w-full h-10/12 object-cover rounded"
      />
      <div className="flex w-full gap-4 p-4 max-w-2xl">
        <div className="flex-shrink-0">
          <img
            src={photoUrl}
            alt="profile photo"
            className="w-14 h-14 rounded-full object-cover sticky top-4"
          />
        </div>

        <p className="text-sm overflow-y-scroll  h-20">
          {readMore ? about.substring(0, 100) : about}
          {about.length > 100 && (
            <button
              onClick={() => setReadMore((prev) => !prev)}
              className="font-semibold cursor-pointer ml-1"
            >
              {readMore ? "Read More" : "Read less"}
            </button>
          )}
        </p>
      </div>
      {/* <div className="flex my-auto items-center space-x-4 border border-orange-400 absolute bottom-[4%]   overflow-y-scroll">
        <img
          src={`${photoUrl}`}
          alt="profile photo"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex ">
          <p className="">
            <>
              {readMore ? about.substring(0, 100) : about.substring(0)}
              <button
                onClick={() => setReadMore((prev) => !prev)}
                className="font-bold mx-1 cursor-pointer"
              >
                {readMore ? "Read More" : "Read less"}
              </button>
            </>
          </p>
        </div>
      </div> */}
    </motion.div>
  );
};
export default FeedData;
