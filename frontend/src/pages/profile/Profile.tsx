import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileRequest } from "./slice";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((store: RootState) => store.profile.error);
  const userProfileData = useSelector(
    (store: RootState) => store?.profile?.profileData
  );
  const loading = useSelector((store: RootState) => store?.profile?.loading);

  useEffect(() => {
    dispatch(profileRequest());
    if (error?.errorCode == "401") {
      navigate("/");
    }
  }, [error]);
  return <div className="">This is the profile page</div>;
};
export default Profile;
