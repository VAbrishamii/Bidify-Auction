import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "../index.css";
/**
 * ListingCard component displays a card for a single listing.
 * It includes the listing's image, title, description, seller information,
 * number of bids, and remaining time for the auction.
 * It also provides a button to view more details about the listing.
 */
const ListingCard = ({ listing }) => {
  const [remainingTime, setRemainingTime] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const MAX_TITLE_LENGTH = 30;
  const MAX_DESCRIPTION_LENGTH = 100;

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const endDate = new Date(listing.endsAt);
      const diff = endDate - now;

      if (diff <= 0) {
        setRemainingTime("Auction ended");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setRemainingTime(
        hours > 0
          ? `${hours}h ${minutes}m`
          : minutes > 0
          ? `${minutes}m ${seconds}s`
          : `${seconds}s`
      );
    };

    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [listing.endsAt]);

  const handleViewDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/listing/${listing.id}`);
    }, 1000);
  };

  return (
    <div className="listing-card">
      {loading && <Loader />} {/* Render the loader when loading is true */}
      {!loading && (
        <>
          {/* Image Section */}
          {listing.media.length > 0 ? (
            <img
              src={listing.media[0].url}
              alt={listing.media[0].alt || "Listing Image"}
            />
          ) : (
            <div className="no-image">No image available</div>
          )}

          <h1>{truncateText(listing.title, MAX_TITLE_LENGTH)}</h1>
          <p>{truncateText(listing.description, MAX_DESCRIPTION_LENGTH)}</p>

          <div className="seller">
            {listing.seller?.avatar?.url ? (
              <img
                src={listing.seller.avatar.url}
                alt={listing.seller.avatar.alt || "Seller Avatar"}
              />
            ) : (
              <div className="placeholder-avatar">No Avatar</div>
            )}
            <h2>Seller: {listing.seller?.name || "Unknown"}</h2>
          </div>

          <div className="bids">
            <h3>Bids: {listing._count.bids}</h3>
          </div>

          <button onClick={handleViewDetails} className="details">
            View Details
          </button>

          <div className="end-time">
            <p>Remainig time: {remainingTime}</p>
          </div>
        </>
      )}
    </div>
  );
};
export default ListingCard;
