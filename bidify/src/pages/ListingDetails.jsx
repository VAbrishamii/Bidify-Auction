import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuctionAPI from "../service/AuctionAPI";
import Carousel from "../components/Carousel";

const auctionAPI = new AuctionAPI("https://v2.api.noroff.dev/");

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [bidAmount, setBidAmount] = useState("");

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
  }, [id]);

  const handlePlaceBid = async () => {
    if (bidAmount > 0) {
      alert(`Place bid of $${bidAmount}`);
      console.log("place bid", bidAmount);
    } else {
      alert("Please Enter a valid bid amount");
      console.log("Invalid bid amount");
    }
  };

  if (!listing) {return <div>Loading...</div>;}

  const topBidders = listing?.bids
    ? listing.bids.sort((a, b) => b.amount - a.amount).slice(0, 5)
    : [];

  return (
    <div className="listing-details">
       <Carousel listings={[listing]} isSingleListing={true}/>
       {/* <Carousel 
    listings={listing?.media ? [{ media: listing.media }] : []} 
    isSingleListing={true} 
/> */}

      <p>{listing.description}</p>

      {/* Bidding Section */}
      <div className="bidding-section">
        <h3>Bids: {listing._count?.bids || 0}</h3>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter your bid"
          min="0"
        />
        <button onClick={handlePlaceBid}>Place Bid</button>
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
        <p>Auction ends at: {new Date(listing.endsAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ListingDetails;
