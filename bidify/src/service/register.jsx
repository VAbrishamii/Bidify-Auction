import { REGISTER_ENDPOINT } from "../constants/apiLinks";

export const registerUser = async (user) => {
    console.log('user', user);
    const response = await fetch(REGISTER_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    console.log('response', response);
    console.log('respinse url', response.url);
    if (!response.ok) {
        const errorDta = await response.json();
        console.log('error data', errorDta);
        throw new Error(errorDta.message || "An error occurred while registering");
      
    }
    const data = await response.json();
    console.log('object data', data);
    return data;
};