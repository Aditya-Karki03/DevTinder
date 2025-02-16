import bcrypt from "bcrypt";

const otpSecretKey = process.env.SECRET_FOR_OTP;

export const generateOtp = async (email: string) => {
  const max = 999999;
  const min = 100000;
  const randomSixDigitOtp = Math.floor(Math.random() * (max - min + 1)) + min;
  const validityTime = 3 * 60 * 1000; //validity time is 3 minutes
  const data = `${email}.${randomSixDigitOtp}.${validityTime}`;
  const hash = await bcrypt.hash(data, 10);
  const fullHash = `${hash}.${validityTime}`;
  return fullHash;
};

export const verifyOtp = async (email: string, hash: string, otp: string) => {
  let [hashValue, validityTime] = hash.split(".");
  const latestTime = Date.now();
  if (latestTime > parseInt(validityTime)) {
    return false;
  }
  const data = `${email}.${otp}.${validityTime}`;
  const newCalculatedHash = await bcrypt.hash(data, 10);
  if (newCalculatedHash == hash) return true;
  else return false;
};
