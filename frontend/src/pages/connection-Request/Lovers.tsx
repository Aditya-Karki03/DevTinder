import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feedRequest } from "./slice";
import store, { RootState } from "../../redux/store";

const Lovers = () => {
  const fetchData = useRef(true);
  const dispatch = useDispatch();
  const feedData = useSelector(
    (store: RootState) => store?.feed?.userReviewConnections
  );
  const error = useSelector((store: RootState) => store?.feed?.error);
  const feedIsLoading = useSelector(
    (store: RootState) => store?.feed?.userAllRequestLoading
  );

  useEffect(() => {
    if (fetchData.current) {
      fetchData.current = false;
      dispatch(feedRequest());
    }
  }, []);

  const handleAccept = () => {};

  const handleReject = () => {};

  return (
    <>
      {feedData &&
        feedData?.map((feed) => (
          <div
            key={feed._id}
            className="w-screen flex justify-center items-center flex-grow"
          >
            <div className="card bg-base-300 w-96 shadow-xl">
              <figure className="pt-5 flex items-center space-x-4 ">
                <img
                  src={`${feed?.photoUrl}`}
                  alt={`${feed?.firstName} ${feed?.lastName}`}
                  className="w-40 h-40 rounded-full"
                />
                <div className="">
                  <h2 className="card-title relative">
                    {`${feed?.firstName} ${feed?.lastName}`}
                    <div className="bg-blue-600 px-2 py-1 rounded-3xl text-sm text-center absolute left-30 bottom-5">
                      NEW
                    </div>
                  </h2>
                  <div className="pt-2">
                    <p className="text-sm font-semibold text-gray-200">
                      Age:{feed?.age}
                    </p>
                    <p className="text-sm font-semibold text-gray-200">
                      Gender:{feed?.gender}
                    </p>
                  </div>
                </div>
              </figure>
              <div className="card-body">
                <p>{`${feed?.about}`}</p>
                <div className="card-actions justify-between mt-5">
                  <button
                    onClick={handleAccept}
                    className="px-5 py-2 bg-blue-500 rounded-lg hover:cursor-pointer outline-none hover:bg-blue-600 transition-all duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={handleReject}
                    className="px-5 py-2 bg-red-500 rounded-lg hover:cursor-pointer outline-none hover:bg-red-600 transition-all duration-200"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
export default Lovers;
