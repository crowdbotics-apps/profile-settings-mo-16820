import axios from 'axios';

// calls with token
const authAPI = axios.create({
  baseURL: 'https://profile-settings-mo-16820.botics.co/', // your app back-end url
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});

function apiLoginRequest(action) {
  return authAPI.post(`/api/v1/login/`, null, {
    data: action.data,
  });
}
function apiSignupRequest(action) {
  return authAPI.post(`/api/v1/signup/`, null, {
    data: action.data,
  });
}
function apiLogoutRequest(action) {
  return authAPI.post(`/rest-auth/logout/`, null, {
    data: action.data,
    headers: action.headers,
  });
}

function apiResetPasswordRequest(action) {
  return authAPI.post(`/rest-auth/password/reset/`, null, {
    data: action.data,
  });
}

export const authServices = {
  apiLoginRequest,
  apiSignupRequest,
  apiLogoutRequest,
  apiResetPasswordRequest,
};
