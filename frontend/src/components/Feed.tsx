import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feedRequest } from "../pages/dashboard/slice";
import store, { RootState } from "../redux/store";

const Feed = () => {
  const fetchData = useRef(true);
  const dispatch = useDispatch();
  const feedData = useSelector((store: RootState) => store?.feed?.userFeed);
  const error = useSelector((store: RootState) => store?.feed?.error);
  const feedIsLoading = useSelector(
    (store: RootState) => store?.feed?.userFeedLoading
  );

  useEffect(() => {
    if (fetchData.current) {
      fetchData.current = false;
      dispatch(feedRequest());
    }
  }, []);
  return (
    <>
      {feedData &&
        feedData?.map((feed) => (
          <div
            key={feed._id}
            className="w-screen flex justify-center items-center flex-grow"
          >
            <div className="card bg-base-300 w-96 shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {`${feed?.firstName} ${feed?.lastName}`}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
export default Feed;
