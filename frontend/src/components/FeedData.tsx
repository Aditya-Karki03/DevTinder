import { useState } from "react";

interface IFeed {
  about: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
}

const FeedData = ({ about, photoUrl }: IFeed) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <div className="mx-auto border border-white/10 h-full w-md rounded-2xl overflow-hidden relative">
      <img
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

        <div className="flex-grow">
          <p className="text-sm overflow-y-scroll">
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
    </div>
  );
};
export default FeedData;
