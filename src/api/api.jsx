
export const API_BASE_URL = "http://192.168.1.3:4000/api/v1";

export const API_ROUTES = {
  requestOtp: `${API_BASE_URL}/auth/otp/request`,
  verifyOtp: `${API_BASE_URL}/auth/continue`,
};

export async function postAuthJson(url, body = {}, idToken = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (idToken) {
    headers.Authorization = `Bearer ${idToken}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(
      data.message ||
        data.error?.message ||
        `API request failed (${response.status})`
    );
  }

  return data;
}
