import { REGISTER_ENDPOINT } from "../constants/apiLinks";
/**
 * registerUser function handles user registration by sending user data to the server.
 * It uses the Fetch API to make a POST request to the registration endpoint,
 * and returns the response data if successful.
 * If an error occurs, it alerts the user with the error message.
 */
export const registerUser = async (user) => {
  try {
    console.log("user", user);

    const response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log("response", response);
    console.log("response url", response.url);

    if (!response.ok) {
      const errorData = await response.json();
      console.log("error data", errorData);

      const errorMessage =
        errorData.errors?.[0]?.message ||
        "Please try again something went wrong while registering";
      alert(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("object data", data);
    return data;
  } catch (error) {
    console.error("Caught an error:", error.message);

    if (
      !error.message ||
      error.message === "An error occurred while registering"
    ) {
      alert("An unexpected error occurred during registration.");
    }
    throw error;
  }
};
