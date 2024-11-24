import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuctionAPI from "../service/AuctionAPI";
import Carousel from "../components/Carousel";
import PlaceBid from "../components/PlaceBid"; // Import the new component

const auctionAPI = new AuctionAPI("https://v2.api.noroff.dev/");

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const loadDetailsListing = async () => {
      try {
        const listingData = await auctionAPI.getSingleListing(id);
        console.log("Single Listing Media:", listingData.data?.media);
        console.log("listingData", listingData);

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
    console.log("Token in listing details:", token);
  }, [id]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date();
  const auctionEndDate = new Date(listing.endsAt);
  const isAuctionEnded = currentDate > auctionEndDate;

  const handleBidPlaced = (newBid) => {
    // Update the listing with the new bid data
    setListing((prev) => ({
      ...prev,
      bids: [...(prev.bids || []), { amount: newBid }],
      _count: { ...prev._count, bids: (prev._count?.bids || 0) + 1 },
    }));
  };

  const topBidders = listing?.bids
    ? listing.bids.sort((a, b) => b.amount - a.amount).slice(0, 5)
    : [];

  return (
    <div className="listing-details">
      <Carousel listings={[listing]} isSingleListing={true} />
      <p>{listing.description}</p>

      {/* Bidding Section */}
      <div className="bidding-section">
        <h3>Bids: {listing._count?.bids || 0}</h3>
        <PlaceBid
          auctionAPI={auctionAPI}
          listingId={id}
          token={token}
          isAuctionEnded={isAuctionEnded}
          onBidPlaced={handleBidPlaced}
        />
      </div>

      {/* Seller Information */}
      <div className="seller">
        {listing.seller?.avatar?.url && (
          <img
            src={listing.seller.avatar.url}
            alt={listing.seller.avatar.alt}
          />
        )}
        <h2>Seller: {listing.seller?.name || "Unknown"}</h2>
      </div>

      {/* Top 5 Bidders */}
      <div className="top-bidders">
        <h3>Top 5 Bidders</h3>
        <ul>
          {topBidders.map((bid, index) => (
            <li key={index}>
              {bid.bidder?.avatar?.url && (
                <img src={bid.bidder.avatar.url} alt={bid.bidder.avatar.alt} />
              )}
              <span>{bid.bidder?.name || "Unknown"}</span>
              <span>Bid: ${bid.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* End Time */}
      <div className="end-time">
        <p>Auction ends at: {auctionEndDate.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ListingDetails;
