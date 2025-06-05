/**
 * API Endpoints for Auction Listings and Profiles
 * This module defines the API endpoints used in the auction application.
 */
export const API_ENDPOINTS = {
  listings: {
    all: "auction/listings",
    single: (id) => `auction/listings/${id}`,
    create: "auction/listings",
    bids: (id) => `auction/listings/${id}/bids`,
    search: (query) => `auction/listings/search?q=${encodeURIComponent(query)}`,
    filterByTagAndActive: (tag, active = true) =>
      `auction/listings?_tag=${encodeURIComponent(tag)}&_active=${active}`,
  },
  profiles: {
    single: (name) => `auction/profiles/${name}`,
    listings: (name) => `auction/profiles/${name}/listings`,
    bids: (name) => `auction/profiles/${name}/bids`,
    update: (name) => `auction/profiles/${name}`,
  },
};
