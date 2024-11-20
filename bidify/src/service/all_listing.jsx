import { ALL_LISTING_ENDPOINT } from "../constants/apiLinks";

export const getAllListings = async () => {
    try {
        const response = await fetch(`${ALL_LISTING_ENDPOINT}?_seller=true&_bids=true`);
        console.log('listing response', response);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred while fetching all listings");
        }
        const data = await response.json();
        console.log('listing data',data);
        return data.data;
    } catch (error) {
        throw new Error(error.message || "An error occurred while fetching all listings");
    }
};