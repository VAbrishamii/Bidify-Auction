import axios from "axios";
import { headers } from "../constants/headers";
import { ALL_LISTING_ENDPOINT, API_BASE } from "../constants/apiLinks";

class AuctionAPI {
  constructor(baseURL = API_BASE) {
    this.api = axios.create({
      baseURL,
      headers: headers(),
    });

    // Predefined API endpoints
    this.endpoints = {
      allListings: ALL_LISTING_ENDPOINT,
      singleListing: (id) => `auction/listings/${id}`,
      bids: (id) => `auction/listings/${id}/bids`,
      createListing: "auction/listings",
      searchListings: (query) => `auction/listings/search?q=${encodeURIComponent(query)}`,
    };
  }

  // Reusable GET method
  async get(endpoint, params = {}) {
    console.log(`[GET] Request to: ${endpoint}`, params);//debugging
    try {
      const response = await this.api.get(endpoint, { params });
      console.log(`[GET] Response from: ${endpoint}`, response.data);//debugging
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Reusable POST method
  async post(endpoint, data) {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Reusable PUT method
  async put(endpoint, data) {
    try {
      const response = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Reusable DELETE method
  async delete(endpoint) {
    try {
      const response = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Handle errors
  handleError(error) {
    if (error.response && error.response.data) {
      console.error("API Error Details:", {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data,
      });
      throw new Error(error.response.data.message || "An error occurred.");
    } else {
      console.error("Unexpected Error:", error.message);
      throw new Error("An unexpected error occurred.");
    }
  }
  

  // Specific API Methods
  getALLListings(page = 1, limit = 14, sort = "created", sortOrder = "desc") {
    console.log("Fetching all listings with parameters:", { page, limit, sort, sortOrder });//debugging
    return this.get(this.endpoints.allListings, {
      page,
      limit,
      sort,
      sortOrder,
      _count: true,
      _seller: true,
      _bids: true,
    }).then((data) => {
      console.log('data in getALLListings', data);
      return {
        listings: data.data,
        meta: data.meta,
      };
    }).catch((error) => {
      console.log('error in getALLListings', error);
      console.error("Error fetching listings:", error);
      throw error;
    });

  }

  getSingleListing(id) {
    return this.get(this.endpoints.singleListing(id), { _seller: true, _bids: true });
  }

  bidOnListing(id, data) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to place a bid");
      return;
    }
    return this.post(this.endpoints.bids(id), data);
  }

  createListing(data) {
    return this.post(this.endpoints.createListing, data);

  }
  searchListings(query) {
    return this.get(this.endpoints.searchListings(query));
  }
}

export default AuctionAPI;
