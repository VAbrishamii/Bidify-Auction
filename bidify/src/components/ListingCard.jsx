import React from "react";

const ListingCard = ({ listing }) => {
    return (
        <div className="listing-card">
          <h3>{listing.title}</h3>
          <p>{listing.description}</p>
          <p>Tags: {listing.tags.join(", ")}</p>
          <p>Ends At: {new Date(listing.endsAt).toLocaleString()}</p>
    
          <div className="seller">
            <h4>Seller: {listing.seller.name}</h4>
            <p>{listing.seller.bio}</p>
            <img src={listing.seller.avatar.url} alt={listing.seller.avatar.alt} />
          </div>
    
          <div className="bids">
            <h4>Bids:</h4>
            {listing.bids.map((bid, index) => (
              <div key={index} className="bid">
                <p>Bid Amount: ${bid.amount}</p>
                <p>Bidder: {bid.bidder.name}</p>
                <p>{new Date(bid.created).toLocaleString()}</p>
              </div>
            ))}
          </div>
    
          {listing.media.length > 0 && (
            <img src={listing.media[0].url} alt={listing.media[0].alt} />
          )}
        </div>
      );

};
export default ListingCard;