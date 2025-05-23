import { LOGIN_ENDPOINT } from "../constants/apiLinks";
import axios from "axios";
import { headers } from "../constants/headers";

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
