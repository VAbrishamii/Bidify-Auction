import React, { useState } from "react";

const PlaceBid = ({ auctionAPI, listingId, token, isAuctionEnded, onBidPlaced }) => {
  const [bidAmount, setBidAmount] = useState("");

  const handlePlaceBid = async () => {
    if (!token) {
      alert("You must be logged in to place a bid.");
      return;
    }

    if (bidAmount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    try {
      const bidData = { amount: parseFloat(bidAmount) };
      console.log("Bid Data:", bidData);

      const response = await auctionAPI.bidOnListing(listingId, bidData);
      console.log("Response:", response);

      if (response) {
        alert(`Successfully placed a bid of $${bidAmount}`);
        onBidPlaced(bidData.amount); // Notify parent component about the new bid
        setBidAmount(""); // Clear input
        const updatedListing = await auctionAPI.getSingleListing(listingId);
        onBidPlaced(updatedListing.data);
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place a bid. Please try again.");
    }
  };

  return (
    <div className="place-bid">
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your bid"
        min="0"
        disabled={isAuctionEnded}
      />
      <button onClick={handlePlaceBid} disabled={isAuctionEnded} className="btn">
        {isAuctionEnded ? "Auction Ended" : "Place Bid"}
      </button>
    </div>
  );
};

export default PlaceBid;

