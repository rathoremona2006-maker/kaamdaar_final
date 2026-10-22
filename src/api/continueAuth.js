import { auth } from "../firebase.js";
import { API_ROUTES, postAuthJson } from "./api.jsx";

export async function continueAuthentication() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "Firebase user is not authenticated. Please verify your OTP first."
    );
  }

  const idToken = await user.getIdToken();

  const result = await postAuthJson(
    API_ROUTES.continue,
    idToken
  );

  return result;
}