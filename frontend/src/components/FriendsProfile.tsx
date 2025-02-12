import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriendsRequest } from "../pages/connections/slice";
import { RootState } from "../redux/store";
import { IProfileData } from "../Types/types";

interface IFriendsProifle {
  friend: IProfileData;
}

const FriendsProfile = ({ friend }: IFriendsProifle) => {
  const [show, setShowMore] = useState(true);
  const handleMoreLess = () => {
    setShowMore((prev) => !prev);
  };
  return (
    <div className="min-w-3xl mx-auto py-4 ">
      <div className="flex justify-between p-4 rounded-2xl shadow-2xl bg-gray-700 ">
        {/* <div className="w-full h-full flex justify-center items-center border border-red-800 my-auto"> */}
        <img
          src="data:image/webp;base64,UklGRlIIAABXRUJQVlA4IEYIAAAQNQCdASrgAJsAPoU+mkilI6KhKzPp2KAQiWdu4MCVyA6pwSX5ZPtNDu93Xzb4aW+7gLTmHFpkM0/2Wn8/q1RXPNg1mzYF3s/l/CPXmBQ+c9/lGz5UOtBJCO9V16jJ0/fKAYZ9qxBmlxXEpTI2PUt28U/6AA/8EAjJnet4fa7dSb1m2AiG1LOmaO8vyHLKg6QK4qshIAUrI8YcGB0GNuW19sx0aC9qJws5bv2S5+P94xkGKIcmfx7AeOhdVDQfDUKpZvW/GRVRhfB/JM7TCXe2epE2GQJUP+YlMj/Rpel+idbW1WL+KlNPNI73Kv/quW0m3DdItXd9146DD/BK6RIEQt+B6Phs6ab5///40jUPiEKxK/QfsvCinn984Q8iw5SCsi4gjEDxnksuAejD3QqVM6aDazvU+95I+rkUSR9OMkwRyX9lxVa5EKiI6L3Y/VNm5d+OuzQSexHM3Dco/0FeFdLEdRVn4fyVg5pyZpRfvP1U1eWXntIKTGT8Z8H8HkMl9nfePFNIb62tBzzIv5ZDPNE1b9OmU8z5xGERM9WY67LJRn48qaOwdOwF2oW+1aOQAP5XRQSIIIyvvQxF9NhVNybU205o6YmUmQsC6SnOe/d0Kl5iGPRM8L6Kq4DwWkiZ5djx9n8RQeoKfWbPRsMT1YhTzV6Z4egIvTmLyBa6PwX7oCaOlmPJIuOqv5keAKKSTbep3w0zZVfCbosPbEFh6Q28HNff8Rk2rjtRmVDKEJWzF7cwHMJOBxi3IYZfiKWjQcXvjAWNwhxUQ+bTayioI25grYEQcnFnS2if2QK/LCgB4PEk62y/fQZ4piMoSfr8aKHOU74zWk37/Oz5PxXvim7/MPfTqv79PSI5v4FTzC2Lcj/s1mACyVZ6EfqkAZPdrSwNLTqWCt0eQD4dOQ51m0r8gvPPaKLJjr0EYBdcvaqw5dKWVqax4eHYjVkNMAzFFawP6o5BLLIQibBh8kQ4lgqdCSW7BtOPhzzf/9ayvHqcqjtN9uo9RumWDpaSvckYNt1AjFGhZSl5OQoiPr/Rb4ild7qVAg/0BhdGV7ZRwukwC0X9shwioHdUdK8K0LSiafLJ9UZ5ke2lihJ9x9E/ozMLX4H0wXCrrcPi/jstios8dfprQ+ZGLdD+NObIEeUo/AF+MmYCj3Pbmy1JmposGp0SyHWt4oPjm2g4QF5l2KnxrhKb7FNNyRYRQAe8SPnEKRgevKlxomnOB/eZIbcGSG5t95TdWYj55EkrT3rUZW7u7dr7Ofy0k7eeO9nZebYZOGuEZcnTR05XsJ0KQf2//m5T8Eypa/f9bC/wpiWjqDJoe1wyxhkK1ajLmndhUPgrzPVi26dBCze4AkudjkdxZ1vthSMT7dcRrzZmSyEyV32hPnqVOoB/RAmJA4ea6+CR2ZteBT0CwGLgQyuJIjyzSrQAl/DC72I+zdq5mSrJrS5/4V2ZUjy1sJrt3Z0LbDtjQFzZxT3VqoZBW1MZSA7xUOq+9yzDaHEeYVNBCZgXoJJ6DQN11owVErgbpJG3isefqPuqHQv8BI/uCN/2eRZQqtLOFJtuPhPZsezCVmx4Nx4tss0qQb/7J7HBG9KFb+PT50Htc38xS+ywAn9Re41c8Mpu/hqkpQukzygRBU1G5QF1W13jIvDd9xAwUIW9fE4rtkz9IDcdpIl5mJvuy7KcqFHLkJjpYQOjcWcPeAJ++PenABLOcgC/B05EGELUMvvsR7vrXitA3QnD6aXimHaYvLMusmryYjJQGdmzkavnm0KpAZxc35VJxqk6oz/GtfLhfN9+ecjrirZ1y/Lv2hJiEHt5RfCv5Q15duCxmGfhq2J7DjBn+eLAgPosQKuYuz2cUQiBdkRXAqagTG8LK6IQTepb7MnKCZGiX9pDzSFabO3TTWCBt5LtpNFl7yQLarsD+d2siViAnvGp5mYv5ZpjK4pLHW7/WmKI2ABGLEh//feSkP+emUsa5S2iCJGPgZEpSSt0AlT7Z2QAqQCHrJzYjpMv8VhoBbYjRu4G8/o8nLAlU+fNombKhdGStkGXu3FYa88UE7YKpyrVy70Kza3nNY+VA81Pew7JYP9SAGZY1XwAZE32LunNat7aujSkAL6/PxUfQwM3LrXJodBnu0gxRvFpk6aMODgn2Ob4DYP76Pl4BaL12hMm9jydPLntudWfBJTvUzURVRW+Tyi1R2I1ETWmQBbMqRsPnFdwHkaxduny2vbRPe/13c32V0y1CNrBvm6dLolaCIYm3QKbz+Nr3sIz+vKMNJBKnPGlyxsv/Hd0Zg6lgpgdFhi0ze68Fec1hlND32HG1e5djzNzNKckZPjJZwIahLzEJ6jsi28yMkKMahUptbD7mNI+c6X8dj/bAEOb+wCDSh9KhaSy3GcoMDJzHoKXgpgOiIH9iOj6Nm067/xhQ/di/nvMz2zjtMQ4XlZo7c3bo/pY/IFLoKj6gIdw7Go3Wy+I6uHyFvBnyxqcYKdg3TwU0oFB8VxKIKC6q+7BDEartRJVlr9sOx9lB5zmDGllvEF+xl7CuBhHr6ptUgBi9J0yOxAuj+PKah1O3Z9zn+TIkBug81TX4lAM3SsDfNwJ4ngg5Ssh+sevBWci/v2A0tvln9AjnQr1b3ZVrCVoX7XyzOxCudkpXkyoSwJNTyXtVOXS+lXvdKEHwPWKpD8CJ6nDLDbaxZwRX0IQtAQtSe/RaEK8Yf+IENqxoGnaLeXBoEteqKYG/kuaKZs9Y9hi0cIlSn3f4ScvlfNlMHNVVPAwoMBXE5pqvtXURGwmoWLnyjN9+Jbro4mRDq8wnIa5frjpKKuo6vpvqtoZ/0AAAAA="
          alt=""
          className="w-40 h-40 rounded-full my-auto object-fill"
        />
        {/* </div> */}
        <div className=" flex flex-col ">
          <div className="flex justify-between items-end ">
            <div className="">
              <p className="block text-2xl font-semibold text-gray-200">
                {friend?.firstName} {friend?.lastName}
              </p>
              <p className="text-sm">{friend?.email}</p>
              <p className="text-sm  text-gray-100 mt-2">
                Gender: {friend?.gender}
              </p>
              <p className="text-sm  text-gray-100 ">Age: {friend?.age}</p>
            </div>
            <button className="px-3 py-2 bg-blue-500 h-10 rounded-3xl flex justify-center items-center">
              Message
            </button>
          </div>
          {/* <div className="max-w-lg text-sm mt-2 ">
            About:
            {friend?.about.length > 50 && !show ? (
              <>
                <p className="inline">{friend?.about.substring(0, 60)} </p>
                <button
                  className="cursor-pointer font-bold"
                  onClick={handleMoreLess}
                >
                  Read More
                </button>
              </>
            ) : (
              <>
                <p className="inline">
                  {friend?.about.substring(0)}
                  {""}
                </p>
                <button
                  className="font-bold cursor-pointer"
                  onClick={handleMoreLess}
                >
                  Read Less
                </button>
              </>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default FriendsProfile;
