
import { REGISTER_ENDPOINT } from "../constants/apiLinks";

export const registerUser = async (user) => {
    try {
        console.log('user', user);

        const response = await fetch(REGISTER_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        console.log('response', response);
        console.log('response url', response.url);

        if (!response.ok) {
            const errorData = await response.json();
            console.log('error data', errorData);
            // Show error message as an alert
            const errorMessage = errorData.errors?.[0]?.message || "Please try again something went wrong while registering";
            alert(errorMessage);
            throw new Error(errorMessage); // Ensure the correct error message is thrown
        }

        const data = await response.json();
        console.log('object data', data);
        return data;
    } catch (error) {
        console.error('Caught an error:', error.message);
        // Only alert if no meaningful error message was already displayed
        if (!error.message || error.message === "An error occurred while registering") {
            alert("An unexpected error occurred during registration.");
        }
        throw error; // Re-throw for further handling
    }
};
