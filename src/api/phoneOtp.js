import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "./firebase";

let confirmationResult = null;

export const sendPhoneOtp = async (phoneNumber) => {
  const verifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    { size: "invisible" }
  );

  try {
    confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      verifier
    );

    return { success: true };
  } catch (error) {
    confirmationResult = null;
    throw error;
  } finally {
    verifier.clear();
  }
};

export const verifyPhoneOtp = async (otp) => {
  if (!confirmationResult) {
    throw new Error(
      "OTP session expired. Please request a new OTP."
    );
  }

  const credential = await confirmationResult.confirm(otp);
  const user = credential.user;

  return {
    idToken: await user.getIdToken(),
    uid: user.uid,
    phoneNumber: user.phoneNumber,
  };
};

export const clearPhoneOtp = () => {
  confirmationResult = null;
};
