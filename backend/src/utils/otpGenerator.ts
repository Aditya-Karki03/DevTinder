import bcrypt from "bcrypt";

const otpSecretKey = process.env.SECRET_FOR_OTP;

export const generateOtp = async (email: string) => {
  const max = 999999;
  const min = 100000;
  const randomSixDigitOtp = Math.floor(Math.random() * (max - min + 1)) + min;
  const validityTime = 3 * 60 * 1000; //validity time is 3 minutes
  const expiresIn = Date.now() + validityTime;
  const data = `${email}.${randomSixDigitOtp}.${expiresIn}`;
  const hash = await bcrypt.hash(data, 10);
  const hashWithExpiryTime = `${hash}.${expiresIn}`;
  return {
    hashedData: hashWithExpiryTime,
    otp: randomSixDigitOtp,
  };
};

export const verifyOtp = async (email: string, hash: string, otp: string) => {
  try {
    const dataInArr = hash.split(".");
    const latestTime = Date.now();
    const expiresIn = dataInArr[dataInArr.length - 1];

    if (latestTime > parseInt(expiresIn)) {
      return {
        isVerified: false,
        message: "OTP Expired. Please try again",
      };
    }
    const data = `${email}.${otp}.${expiresIn}`;
    dataInArr.splice(dataInArr.length - 1, 1);
    const hashSentFromUser = dataInArr.join(".");
    const ok = await bcrypt.compare(data, hashSentFromUser);
    if (!ok) {
      return {
        isVerified: false,
        message: "Invalid OTP. Check your email",
      };
    }
    return {
      isVerified: true,
      message: "OTP Verification Successful.",
    };
  } catch (error) {
    return {
      isVerified: false,
      message: "Something went wrong. Please try again",
    };
  }
};
