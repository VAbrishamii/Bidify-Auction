import { API_key } from "./apiLinks";
/**
 * Function to generate headers for API requests
 * 
 */
export function headers() {
  const token = localStorage.getItem("token");
  const header = {};

  header["Content-Type"] = "application/json";

  if (token) {
    header["Authorization"] = `Bearer ${token}`;
  } else {
    console.warn("No token found in localStorage");
  }

  if (API_key) {
    header["X-Noroff-API-Key"] = API_key;
  } else {
    console.warn("API Key is missing");
  }

  return header;
}
