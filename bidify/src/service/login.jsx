import { LOGIN_ENDPOINT } from "../constants/apiLinks";
import axios from "axios";

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(
            LOGIN_ENDPOINT,
            { email: credentials.email, password: credentials.password }, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data; 
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || "An error occurred while logging in";
        throw new Error(errorMessage);
    }
};
