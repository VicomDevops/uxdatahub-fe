import jwtDecode from "jwt-decode";
import { URL_API } from "./../config.json";
import { AUTH_CONSTANT_API } from "./constant/authConstantApi";
import httpServices from "./httpServices";


const TOKEN_KEY = "token";

httpServices.setToken();

/**
 * Sends a POST request to login the user.
 *
 * @param {string} username - The username of the user to log in.
 * @param {string} password - The password of the user to log in.
 *
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws Will throw an error if the request fails.
 */
const loginUser = async (username, password) => {
  const user = await httpServices.post(URL_API + AUTH_CONSTANT_API.LOGIN_CHECK, { username, password });
  return user;
}

/**
 * Sends a POST request to reset the password of the user with the given email.
 *
 * @param {string} email - The email of the user to reset the password for.
 *
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws Will throw an error if the request fails.
 */
const forgetPassword = async (email) => {
  const user = await httpServices.post(URL_API + AUTH_CONSTANT_API.MODIFIER_PASSWORD, { email });
  return user;
}

/**
 * Confirms a client account using a token.
 *
 * @param {string} token - The token for confirming the client account.
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws Will throw an error if the request fails.
 */
const confirmClientAccount = async (token) => {
  try {
    const response = await httpServices.get(URL_API + AUTH_CONSTANT_API.CONFIRM, {
      params: { token: token },
    });
    return response;
  } catch (error) {
    console.error('Error confirming account:', error);
    throw error;
  }
};

/**
 * Returns the current user from the token in local storage.
 *
 * @returns {Object|null} - The current user or null if no token is present.
 */
const getCurrentUserTokenDecoded = () => {
  try {
    const userDecoded = jwtDecode(httpServices.getToken());
    return userDecoded
  } catch (ex) {
    return null;
  }
}

/**
 * Logs the user in by saving the given JWT in local storage.
 * @param {string} jwt - The JWT to save in local storage.
 */
const loginWithJwt = (jwt) => {
  localStorage.setItem(TOKEN_KEY, jwt);
  httpServices.setToken();
}

/**
 * Logs the user out by removing the JWT from local storage.
 */
const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}


//ENDPOINTS
const AuthServices = {
  loginUser,
  forgetPassword,
  confirmClientAccount,
  getCurrentUserTokenDecoded,
  loginWithJwt,
  logout,
};

//EXPORT ENDPOINTS
const authServices = AuthServices;
export default authServices;