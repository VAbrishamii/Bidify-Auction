// import { API_key } from './apiLinks';

// export function headers() {
//     const token = localStorage.getItem('token');
//     const header = new Headers();

//     header.append('Content-Type', 'application/json');

//     if (token) {
//         console.log('Token included in headers:', token); // Debugging
//         header.append('Authorization', `Bearer ${token}`);
//     } else {
//         console.warn('No token found in localStorage');
//     }

//     if (API_key) {
//         console.log('API Key included in headers:', API_key); // Debugging
//         header.append('X-Noroff-API-Key', API_key);
//     } else {
//         console.warn('API Key is missing');
//     }
//         console.log('Constructed Headers:', Object.fromEntries(header.entries()));

//     return header;
// }
// headers.js
import { API_key } from './apiLinks';

export function headers() {
    const token = localStorage.getItem('token');
    const header = {};

    header['Content-Type'] = 'application/json';

    if (token) {
        console.log('Token included in headers:', token); // Debugging
        header['Authorization'] = `Bearer ${token}`;
    } else {
        console.warn('No token found in localStorage');
    }

    if (API_key) {
        console.log('API Key included in headers:', API_key); // Debugging
        header['X-Noroff-API-Key'] = API_key;
    } else {
        console.warn('API Key is missing');
    }

    console.log('Constructed Headers:', header);

    return header;
}

