import { LOGIN_ENDPOINT } from "../constants/apiLinks";
import axios from "axios";
import { headers } from "../constants/headers";
/**
 * loginUser function handles user login by sending credentials to the server.
 * It uses axios to make a POST request to the login endpoint,
 * and returns the response data if successful.
 * If an error occurs, it alerts the user with the error message.
 */
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      LOGIN_ENDPOINT,
      { email: credentials.email, password: credentials.password },
      {
        headers: headers(),
      }
    );
    return response.data;
  } catch (error) {
    const errorMessage = alert(
      error.response?.data?.message ||
        "Pleae try agian something in your Usernmae or Password is wrong"
    );
    throw new Error(errorMessage);
  }
};
