import React, {useEffect, useState }from "react";

const ListingCard = ({ listing }) => {
  const [remainingTime, setRemainingTime] = useState("");

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


  return (
    <div className="listing-card">
      {listing.media.length > 0 && (
        <img src={listing.media[0].url} alt={listing.media[0].alt} />
      )}
      <h1>{listing.title}</h1>
      <p>{listing.description}</p>
      <div className="seller">
        <h2>Seller: {listing.seller.name}</h2>
      </div>
      <div className="bids">
        <h3>Bids: {listing._count.bids}</h3>
        </div>
        <div className="end-time">
        <p>Auction remainig time {remainingTime}</p>
        </div>

    </div>
  );
};
export default ListingCard;
