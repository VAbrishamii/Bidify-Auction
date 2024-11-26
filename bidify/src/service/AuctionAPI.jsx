import { headers } from "../constants/headers";

export default class AuctionAPI {
  constructor(baseURL) {
    this.baseURL = "https://v2.api.noroff.dev/";
  }

  async getAuctions(endpoint, Options) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, Options);
      if (!response.ok) {
        const errorText = await response.text();
        console.log("api request failed", errorText);
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(
            errorData.message || "An error occurred while fetching all auctions"
          );
        } catch (jsonError) {
          throw new Error("An unexpected error occurred: " + errorText);
        }
      }

      return await response.json();
    } catch (error) {
      console.error("API Request Failed", error);
      throw error;
    }
  }

  async postAuction(endpoint, Options = {}) {
    console.log("POST Request:", `${this.baseURL}${endpoint}`, Options);
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, Options);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("API Request Failed", errorData);
        throw new Error(
          errorData.message || "An error occurred while fetching all auctions"
        );
      }
      return await response.json();
    } catch (error) {
      console.error("API Request Failed", error);
      throw error;
    }
  }

  async getALLListings(
    page = 1,
    limit = 14,
    sort = "created",
    sortOrder = "desc"
  ) {
    try {
      const response = await fetch(
        `${this.baseURL}auction/listings?sort=${sort}&sortOrder=${sortOrder}&page=${page}&limit=${limit}&_count=true&_seller=true&_bids=true`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error fetching listings");
      }

      const data = await response.json();
      console.log("data in getALLListings", data);
      return {
        listings: data.data, 
        meta: data.meta,
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

  bidOnListing(id, data) {
    const token = localStorage.getItem("token");
    console.log("token in bidOnListing", token);
    if (!token) {
      alert("You must be logged in to place a bid");
      return;
    }
    return this.postAuction(`auction/listings/${id}/bids`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data),
    });
  }

  createListing(data) {
    return this.postAuction("auction/listings", {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data),
    });
  }
}
