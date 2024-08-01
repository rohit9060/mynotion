import { randomBytes } from "crypto";

export const generateOTP = () => {
  const otp = randomBytes(3).toString("hex");
  const otpNum = parseInt(otp, 16) % 1000000;
  const paddedOtp = otpNum.toString().padStart(6, "0");
  return paddedOtp;
};
