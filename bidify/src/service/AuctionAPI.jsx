import axios from "axios";
import { headers } from "../constants/headers";
import { ALL_LISTING_ENDPOINT, API_BASE } from "../constants/apiLinks";

class AuctionAPI {
  constructor(baseURL = API_BASE) {
    this.api = axios.create({
      baseURL,
      headers: headers(),
    });

    this.endpoints = {
      allListings: ALL_LISTING_ENDPOINT,
      singleListing: (id) => `auction/listings/${id}`,
      bids: (id) => `auction/listings/${id}/bids`,
      createListing: "auction/listings",
      searchListings: (query) =>
        `auction/listings/search?q=${encodeURIComponent(query)}`,
      singleProfile: (name) => `auction/profiles/${name}`,
      allListingsByProfile: (name) => `auction/profiles/${name}/listings`,
      allBidsByProfile: (name) => `auction/profiles/${name}/bids`,
      updateProfile: (name) => `auction/profiles/${name}`,
      filterByTagAndActive: (tag, active = true) =>
        `auction/listings?_tag=${encodeURIComponent(tag)}&_active=${active}`,
    };
  }

  // Reusable GET method
  async get(endpoint, params = {}) {
    try {
      const response = await this.api.get(endpoint, { params });
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

  handleError(error) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message || "An error occurred.";
      alert(errorMessage);
      console.error("API Error Details:", {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data,
      });
      throw new Error(errorMessage);
    } else {
      const fallbackMessage = "An unexpected error occurred.";
      alert(fallbackMessage);
      console.error("Unexpected Error:", error.message);
      throw new Error(fallbackMessage);
    }
  }

  // Specific API Methods
  async getALLListings(
    page = 1,
    limit = 14,
    sort = "created",
    sortOrder = "desc"
  ) {
    return this.get(this.endpoints.allListings, {
      page,
      limit,
      sort,
      sortOrder,
      _count: true,
      _seller: true,
      _bids: true,
    })
      .then((data) => {
        return {
          listings: data.data,
          meta: data.meta,
        };
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
        throw error;
      });
  }

  getSingleListing(id) {
    return this.get(this.endpoints.singleListing(id), {
      _seller: true,
      _bids: true,
    });
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
  deleteListing(id) {
    return this.delete(this.endpoints.singleListing(id));
  }

  searchListings(query) {
    return this.get(this.endpoints.searchListings(query));
  }

  singleProfile(name) {
    return this.get(this.endpoints.singleProfile(name));
  }
  allListingsByProfile(name) {
    return this.get(
      `${this.endpoints.allListingsByProfile(name)}?_seller=true&_bids=true`
    );
  }
  allBidsByProfile(name) {
    return this.get(`${this.endpoints.allBidsByProfile(name)}?_listings=true`);
  }
  updateProfile(name, data) {
    return this.put(this.endpoints.updateProfile(name), data);
  }
  filterByTagAndActive(tag, active = true) {
    return this.get(this.endpoints.filterByTagAndActive(tag, active));
  }
}

export default AuctionAPI;
