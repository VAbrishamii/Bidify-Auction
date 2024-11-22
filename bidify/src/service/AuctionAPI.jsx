export default class AuctionAPI {
    constructor(baseURL) {
        this.baseURL = "https://v2.api.noroff.dev/";
    }

    async getAuctions(endpoint,Options) {
       try {
           const response = await fetch(`${this.baseURL}${endpoint}`,Options);
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

    getALLListings() {
        return this.getAuctions(`auction/listings?_seller=true&_bids=true`);
    }

    getSingleListing(id) {
        return this.getAuctions(`auction/listings/${id}?_seller=true&_bids=true`);
    }  
    
    bidOnListing(id,data,token) {
        return this.postAuction(`auction/listings/${id}/bids`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    }

    createListing(data) {
        return this.postAuction('auction/listings',{
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}