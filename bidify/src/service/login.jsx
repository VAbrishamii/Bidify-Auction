import { LOGIN_ENDPOINT } from "../constants/apiLinks";
import axios from 'axios';

export const loginUser = async (credentials) => {
    const response = await axios.post(LOGIN_ENDPOINT, credentials, {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    console.log('response', response);
    console.log('response url', response.url);

    if (!response.ok) {
        const errorDta = await response.json();
        throw new Error(errorDta.message || "An error occurred while logging in");
    }

    const data = await response.json();
    console.log('object data', data);
    return data;
};