import  { useState } from "react";
import { toast } from "react-toastify";
/**
 * ImageUploader component allows users to upload images to Cloudinary.
 * It handles multiple image uploads, displays uploaded images, and allows deletion of images.
 * It uses Cloudinary's API to upload images and provides feedback on the upload status.
 *
 */
const PlaceBid = ({
  auctionAPI,
  listingId,
  token,
  isAuctionEnded,
  onBidPlaced,
}) => {
  const [bidAmount, setBidAmount] = useState("");

  const handlePlaceBid = async () => {
    if (!token) {
      toast.error("You must be logged in to place a bid.");
      return;
    }

    if (bidAmount <= 0) {
      toast.error("Please enter a valid bid amount.");
      return;
    }

    try {
      const bidData = { amount: parseFloat(bidAmount) };
 

      const response = await auctionAPI.bidOnListing(listingId, bidData);
   

      if (response) {
        toast.success(`Successfully placed a bid of $${bidAmount}`);
        onBidPlaced(bidData.amount);
        setBidAmount("");
        const updatedListing = await auctionAPI.getSingleListing(listingId);
        onBidPlaced(updatedListing.data);
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      toast.error("Failed to place a bid. Please try again.");
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
      <button
        aria-label="Place Bid"
        onClick={handlePlaceBid}
        disabled={isAuctionEnded}
        className="btn">
        {isAuctionEnded ? "Auction Ended" : "Place Bid"}
      </button>
    </div>
  );
};

export default PlaceBid;
