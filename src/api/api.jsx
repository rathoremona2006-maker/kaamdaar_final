
/*
|--------------------------------------------------------------------------
| Kaamdaar API Configuration
|--------------------------------------------------------------------------
| Abhi signup Preview Mode mein chalega.
| Backend ready hone par base URL aur routes yahin configure karna.
*/

// Backend ka common base URL
export const API_BASE_URL = 'http://localhost:5000/api/v1';

// Saare API endpoints ek hi jagah
export const API_ROUTES = {
  auth: {
    requestOtp: `${API_BASE_URL}/auth/otp/request`,
    verifyOtp: `${API_BASE_URL}/auth/otp/verify`,
    registerCustomer: `${API_BASE_URL}/auth/register/customer`,
    requestLoginOtp: `${API_BASE_URL}/auth/login/otp/request`,
  },
};

/*
|--------------------------------------------------------------------------
| Future API usage example
|--------------------------------------------------------------------------
|
| import { API_ROUTES } from '../api/api';
|
| const response = await fetch(API_ROUTES.auth.requestOtp, {
|   method: 'POST',
|   headers: {
|     'Content-Type': 'application/json',
|   },
|   body: JSON.stringify({
|     email,
|     mobile,
|     purpose: 'registration',
|     verification_method: verificationMethod,
|   }),
| });
|
| Abhi is API call ko execute mat karna.
| Preview Mode mein hardcoded navigation use hogi.
|
*/
