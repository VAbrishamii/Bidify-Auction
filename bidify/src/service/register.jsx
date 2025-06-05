import { REGISTER_ENDPOINT } from "../constants/apiLinks";
import { toast } from "react-toastify";
/**
 * registerUser function handles user registration by sending user data to the server.
 * It uses the Fetch API to make a POST request to the registration endpoint,
 * and returns the response data if successful.
 * If an error occurs, it alerts the user with the error message.
 */
export const registerUser = async (user) => {
  try {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();

      const errorMessage =
        errorData.errors?.[0]?.message ||
        "Please try again something went wrong while registering";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Caught an error:", error.message);

    if (
      !error.message ||
      error.message === "An error occurred while registering"
    ) {
      toast.error(
        "An unexpected error occurred during registration. Please try again."
      );
    }
    throw error;
  }
};
