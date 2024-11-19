// import { LOGIN_ENDPOINT } from "../constants/apiLinks";
// import axios from 'axios';

// export const loginUser = async (credentials) => {
//     const response = await axios.post(LOGIN_ENDPOINT, {email:credentials.email, password:credentials.password}, {
        
//             headers: {
//             "Content-Type": "application/json",
//         },
    
//         body: JSON.stringify({ email: credentials.email, password: credentials.password }),
//     });
//     console.log('response', response);
//     console.log('response url', response.url);

//     if (!response.ok) {
//         const errorDta = await response.json();
//         throw new Error(errorDta.message || "An error occurred while logging in");
//     }

//     const data = await response.json();
//     console.log('object data', data);
//     return data;
// };
import { LOGIN_ENDPOINT } from "../constants/apiLinks";
import axios from "axios";

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(
            LOGIN_ENDPOINT,
            { email: credentials.email, password: credentials.password }, // Request body
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data; // Axios responses have the data directly available
    } catch (error) {
        // Extract and throw error message for better debugging
        const errorMessage =
            error.response?.data?.message || "An error occurred while logging in";
        throw new Error(errorMessage);
    }
};
