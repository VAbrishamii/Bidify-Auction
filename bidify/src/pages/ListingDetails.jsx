import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuctionAPI from "../service/AuctionAPI";
import Carousel from "../components/Carousel";
import PlaceBid from "../components/PlaceBid";

const auctionAPI = new AuctionAPI("https://v2.api.noroff.dev/");
/**
 *
 * ListingDetails component that displays the details of a specific listing.
 * It fetches the listing data based on the ID from the URL parameters,
 * handles the bidding process, and displays seller information and top bidders.
 * It uses React hooks for state management and side effects,
 */
const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const loadDetailsListing = async () => {
      try {
        const listingData = await auctionAPI.getSingleListing(id);

        if (listingData) {
          setListing(listingData.data);
        } else {
          console.error("Error loading listing", listingData);
          setListing(null);
        }
      } catch (error) {
        console.error("Error loading listing", error);
        setListing(null);
      }
    };

    loadDetailsListing();

    const token = localStorage.getItem("token");
    setToken(token);
  }, [id]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date();
  const auctionEndDate = new Date(listing.endsAt);
  const isAuctionEnded = currentDate > auctionEndDate;

  const handleBidPlaced = async () => {
    try {
      const updatedListing = await auctionAPI.getSingleListing(id);
      setListing(updatedListing.data);
    } catch (error) {
      console.error("Error updating listing after placing bid:", error);
    }
  };

  const topBidders = listing?.bids
    ? listing.bids.sort((a, b) => b.amount - a.amount).slice(0, 5)
    : [];

  return (
    <div className="listing-details">
      <Carousel
        listings={[listing]}
        isSingleListing={true}
        showAllImages={true}
      />

      <div className="left-section">
        {/* Left Section */}
        <div className="left-section-content">
          <h1>{listing.title}</h1>
          <p>{listing.description}</p>

          {/* Bidding Section */}
          <div className="bidding-section">
            <h2>Bids: {listing._count?.bids || 0}</h2>
            <PlaceBid
              auctionAPI={auctionAPI}
              listingId={id}
              token={token}
              isAuctionEnded={isAuctionEnded}
              onBidPlaced={handleBidPlaced}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          {/* Seller Information */}
          <div className="seller">
            {listing.seller?.avatar?.url && (
              <img
                src={listing.seller.avatar.url}
                alt={listing.seller.avatar.alt}
              />
            )}
            <h3 className="text-lg font-semibold text-center mt-2">
              Seller: {listing.seller?.name || "Unknown"}
            </h3>
          </div>

          {/* Top 5 Bidders */}
          <div className="top-bidders">
            <h4>Top 5 Bidders</h4>
            <ul>
              {topBidders.map((bid, index) => (
                <li key={index}>
                  {bid.bidder?.avatar?.url && (
                    <img
                      src={bid.bidder.avatar.url}
                      alt={bid.bidder.avatar.alt}
                    />
                  )}
                  <div className="bidder-info">
                    <span>{bid.bidder?.name || "Unknown"}</span>
                    <p>Bid: ${bid.amount}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* End Time */}
      <div className="mt-8 text-center">
        <p className="text-red-default ">
          Auction ends at: {auctionEndDate.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ListingDetails;
