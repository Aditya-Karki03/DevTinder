import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptOrRejectConnectionRequest,
  getAllIncomingConnectionRequest,
} from "./slice";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Lovers = () => {
  const fetchData = useRef(true);
  const dispatch = useDispatch();
  // const feedData = useSelector(
  //   (store: RootState) => store?.feed?.userReviewConnections
  // );
  const {
    wantToConnectUsers,
    acceptOrRejectionMessage,
    reviewingTheRequest,
    connectionsLoading,
    errorInGettingConnection,
    errorInReviewingRequest,
    acceptOrRejectionFailure,
    acceptOrRejectionSuccessful,
  } = useSelector((store: RootState) => store?.feed);
  // const error = useSelector((store: RootState) => store?.feed?.error);
  // const feedIsLoading = useSelector(
  //   (store: RootState) => store?.feed?.userAllRequestLoading
  // );
  useEffect(() => {
    if (fetchData.current) {
      fetchData.current = false;
      dispatch(getAllIncomingConnectionRequest());
    }
    if (!reviewingTheRequest) {
      if (errorInReviewingRequest && acceptOrRejectionFailure) {
        toast.error(errorInReviewingRequest.error);
      } else if (acceptOrRejectionSuccessful) {
        console.log(errorInReviewingRequest);
        console.log(acceptOrRejectionMessage);
        toast.success(acceptOrRejectionMessage);
      }
    }
  }, [
    reviewingTheRequest,
    errorInGettingConnection,
    acceptOrRejectionMessage,
    acceptOrRejectionSuccessful,
    acceptOrRejectionFailure,
  ]);

  // const removeFromRequestList=(id:string)=>{
  //   const updat
  // }

  //to accept or reject, we need to get the senders id
  const handleAccept = (_id: string) => {
    const reviewData = {
      id: _id,
      status: "accepted",
    };
    dispatch(acceptOrRejectConnectionRequest(reviewData));
  };

  const handleReject = (_id: string) => {
    const reviewData = {
      id: _id,
      status: "rejected",
    };
    dispatch(acceptOrRejectConnectionRequest(reviewData));
  };

  return (
    <div className="w-screen h-screen py-4 flex flex-col space-y-4 items-center relative">
      {connectionsLoading && (
        <div className="absolute top-0 left-0 h-full w-full h-s bg-black/20 flex  flex-grow justify-center items-center">
          <Loader2 className="h-12 w-12 text-white animate-spin" />
        </div>
      )}
      {wantToConnectUsers &&
        wantToConnectUsers?.map((request) => (
          <div
            key={request._id}
            className="card bg-gray-950 w-4xl shadow-xl rounded-xl "
          >
            <div className="w-full flex justify-between py-5 px-5">
              <div className="flex items-center space-x-4 ">
                <img
                  src={`${request?.fromRequest?.photoUrl}`}
                  alt={`${request?.fromRequest?.firstName} ${request?.fromRequest?.lastName}`}
                  className="w-40 h-40 rounded-full"
                />
                <div className="">
                  <h2 className="card-title relative">
                    {`${request?.fromRequest?.firstName} ${request?.fromRequest?.lastName}`}
                    <div className="bg-blue-600 px-2 py-1 rounded-3xl text-sm text-center absolute -left-14 bottom-6">
                      NEW
                    </div>
                  </h2>
                  <p className="text-sm font-semibold text-gray-200">
                    Age:{request?.fromRequest?.age}
                  </p>
                  <p className="text-sm font-semibold text-gray-200">
                    Gender:{request?.fromRequest?.gender}
                  </p>
                  <p className="w-xl text-wrap mt-2">{`${request?.fromRequest?.about}`}</p>
                </div>
              </div>
              <div className="h-full  flex flex-col justify-between ">
                <button
                  onClick={() => handleAccept(request._id)}
                  className="btn btn-primary"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request._id)}
                  className="btn btn-secondary"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      {!wantToConnectUsers?.length && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="card bg-base-300 w-4xl shadow-xl p-5 flex justify-center items-center">
            <h2 className="card-title">No Connection Requests!</h2>
          </div>
        </div>
      )}
    </div>
  );
};
export default Lovers;
