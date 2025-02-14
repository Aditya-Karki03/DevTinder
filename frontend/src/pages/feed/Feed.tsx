import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  connectionRejectionRequest,
  getFeedDataRequest,
  manipulateFeedData,
} from "./slice";
import FeedData from "../../components/FeedData";
import { Loader2 } from "lucide-react";

const Feed = () => {
  const [rightSwipe, setRightSwipe] = useState(0);
  // const [isSwiped, setIsSwiped] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const feedsData = useSelector((store: RootState) => store?.feeds?.feedData);
  const loading = useSelector((store: RootState) => store?.feeds?.loading);
  useEffect(() => {
    // dispatch(getFeedDataRequest());
    dispatch(manipulateFeedData(feeds));
  }, []);
  // useEffect(() => {
  //   if (isSwiped) {
  //     const newFeed = feedsData?.filter((data) => data._id !== id);
  //     dispatch(manipulateFeedData(newFeed || []));
  //   }
  // }, [isSwiped]);

  if (rightSwipe >= 150) {
    //use a boolean value called flag to just send one connection request and also dispatching the action
    //  setIsSwiped(true);
    const status = "send";
    dispatch(connectionRejectionRequest({ status, id }));
  } else if (rightSwipe <= -250) {
    // setIsSwiped(true);
    const status = "ignore";
    dispatch(connectionRejectionRequest({ status, id }));
  } else {
    // setIsSwiped(false);
  }

  const feeds = [
    {
      _id: "feed001",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@example.com",
      age: 28,
      gender: "Female",
      photoUrl:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
      about:
        "Web developer passionate about creating beautiful and functional user interfaces. I love working with React and exploring new technologies. When I'm not coding, you can find me hiking or reading tech blogs.",
      skills: ["React", "JavaScript", "CSS", "UI Design", "Redux"],
    },
    {
      _id: "feed002",
      firstName: "Michael",
      lastName: "Chen",
      email: "michael.chen@example.com",
      age: 32,
      gender: "Male",
      photoUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
      about:
        "UI/UX designer with 5 years of experience. Currently working on designing intuitive mobile applications. I believe in minimalist design and user-centered approaches. Always looking to connect with fellow designers!",
      skills: [
        "Figma",
        "Adobe XD",
        "Wireframing",
        "Prototyping",
        "User Research",
      ],
    },
    {
      _id: "feed003",
      firstName: "Emily",
      lastName: "Rodriguez",
      email: "emily.rodriguez@example.com",
      age: 30,
      gender: "Female",
      photoUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
      about:
        "Full-stack developer specializing in MERN stack. Currently building a startup focused on AI-powered education tools. Open to collaborations and always excited to learn from others in the tech community.",
      skills: ["MongoDB", "Express.js", "React", "Node.js", "TypeScript"],
    },
  ];

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
              about={feed.about}
              photoUrl={feed.photoUrl}
              firstName={feed.firstName}
              lastName={feed.lastName}
              setRightSwipe={setRightSwipe}
              setId={setId}
            />
          ))
        ) : (
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        )}
      </div>
    </div>
  );
};
export default Feed;
