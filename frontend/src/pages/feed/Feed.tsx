import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { getFeedDataRequest } from "./slice";
import FeedData from "../../components/FeedData";
import { Loader2 } from "lucide-react";
import { useMotionValue, motion } from "motion/react";

const Feed = () => {
  //very similar to useState, here value of x is set to 0
  //the x defines, how mch we moved into x direction in the browser
  const x = useMotionValue(0);
  const dispatch = useDispatch();
  // const feeds = useSelector((store: RootState) => store?.feeds?.feedData);
  const loading = useSelector((store: RootState) => store?.feeds?.loading);
  useEffect(() => {
    dispatch(getFeedDataRequest());
  }, []);

  const feeds = [
    {
      _id: "feed001",
      about:
        "Web developer passionate about creating beautiful and functional user interfaces. I love working with React and exploring new technologies. When I'm not coding, you can find me hiking or reading tech blogs.",
      photoUrl:
        "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
      firstName: "Sarah",
      lastName: "Johnson",
    },
    {
      _id: "feed002",
      about:
        "UI/UX designer with 5 years of experience. Currently working on designing intuitive mobile applications. I believe in minimalist design and user-centered approaches. Always looking to connect with fellow designers!",
      photoUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
      firstName: "Michael",
      lastName: "Chen",
    },
    {
      _id: "feed003",
      about:
        "Full-stack developer specializing in MERN stack. Currently building a startup focused on AI-powered education tools. Open to collaborations and always excited to learn from others in the tech community.",
      photoUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
      firstName: "Emily",
      lastName: "Rodriguez",
    },
    // {
    //   _id: "feed004",
    //   about:
    //     "Product manager by day, tech blogger by night. I write about emerging technologies and their impact on society. Recently started exploring machine learning and its applications in everyday products.",
    //   photoUrl: "https://example.com/photos/user4.jpg",
    //   firstName: "David",
    //   lastName: "Smith",
    // },
    // {
    //   _id: "feed005",
    //   about:
    //     "DevOps engineer working on cloud infrastructure and automation. Love sharing knowledge about AWS and containerization. Currently learning about Kubernetes and microservices architecture.",
    //   photoUrl: "https://example.com/photos/user5.jpg",
    //   firstName: "Lisa",
    //   lastName: "Thompson",
    // },
  ];
  const MotionFeedComponnt = motion.create(FeedData);
  return (
    <div className="flex w-screen flex-grow border border-red-500 py-20 overflow-hidden">
      <div className="w-full h-full grid place-items-center">
        {feeds && feeds?.length > 0 ? (
          feeds?.map((feed) => (
            <MotionFeedComponnt
              key={feed._id}
              about={feed.about}
              photoUrl={feed.photoUrl}
              firstName={feed.firstName}
              lastName={feed.lastName}
              // x={x}
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
