import { headers } from "../constants/headers";

export default class AuctionAPI {
    constructor(baseURL) {
        // this.baseURL = "https://v2.api.noroff.dev/";
        this.baseURL = baseURL;
    }
    addTimestampToEndpoint(endpoint) {
        const timestamp = Date.now();
        const separator = endpoint.includes("?") ? "&" : "?";
        return `${endpoint}${separator}timestamp=${timestamp}`;
      }


    async getAuctions(endpoint,Options) {

       try {
        const urlWithTimestamp = this.addTimestampToEndpoint(endpoint);
        const response = await fetch(`${this.baseURL}${urlWithTimestamp}`, Options);
        //    const response = await fetch(`${this.baseURL}${endpoint}`,Options);
           if (!response.ok) {
               const errorData = await response.json();
               throw new Error(errorData.message || "An error occurred while fetching all auctions");
           }
           return await response.json();
        } catch (error) {
            console.error('API Request Failed',error);
            throw error;
       }
    }

    async postAuction(endpoint,Options = {}) {
        console.log('POST Request:', `${this.baseURL}${endpoint}`, Options); 
        try {
            const urlWithTimestamp = this.addTimestampToEndpoint(endpoint);
            const response = await fetch(`${this.baseURL}${urlWithTimestamp}`, Options);
            // const response = await fetch(`${this.baseURL}${endpoint}`,Options);
            if (!response.ok) {
                const errorData = await response.json();
                console.log('API Request Failed',errorData);
                throw new Error(errorData.message || "An error occurred while fetching all auctions");
            }
            return await response.json();
        } catch (error) {
            console.error('API Request Failed',error);
            throw error;
    };
    }

   
    // getALLListings() {
    //     return this.getAuctions(`auction/listings?_seller=true&_bids=true`, {
    //         method: "GET",
    //         headers: headers(),
    //     });
    // }

    async getALLListings(page = 1, limit = 14, sort = "created" ,sortOrder = "desc") {
        try {
            const response = await fetch(
                `${this.baseURL}auction/listings?sort=${sort}&sortOrder=${sortOrder}&_page=${page}&_limit=${limit}&_count=true&_seller=true&_bids=true`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error fetching listings");
            }

            const data = await response.json();
            console.log('data in getALLListings', data);

            // Return the listings and meta information (for pagination)
            return {
                listings: data.data, // The listings data array
                meta: data.meta // Pagination and metadata
            };
        } catch (error) {
            console.error("Error fetching listings:", error);
            throw error;
        }
    }
   
    getSingleListing(id) {
        return this.getAuctions(`auction/listings/${id}?_seller=true&_bids=true`, {
            method: "GET",
            headers: headers(),
        });
    }

    bidOnListing(id,data) {
        const token = localStorage.getItem('token');
        console.log('token in bidOnListing', token);   
        if (!token) {
            alert('You must be logged in to place a bid');
            return;
        }
        return this.postAuction(`auction/listings/${id}/bids`,{
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(data),
        
        });
       
    }
  

    createListing(data) {
        return this.postAuction('auction/listings',{
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(data),
        });
    }
}