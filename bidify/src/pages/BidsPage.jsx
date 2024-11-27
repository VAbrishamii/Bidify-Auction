import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // useParams to access the dynamic URL parameter
import AuctionAPI from "../service/AuctionAPI";  // Assuming you have an API service for bids

const BidsPage = () => {
  const { username } = useParams();  // Get the username from the URL
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const api = new AuctionAPI();
        const fetchedBids = await api.allBidsByProfile(username);
        console.log('fetchedBids', fetchedBids);
        setBids(fetchedBids);
      } catch (error) {
        console.error("Error fetching bids:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bids-page">
      <h1>Bids made by {username}</h1>
      {bids.data.length > 0 ? (
        <div>
          {bids.data.map((bid) => (
            <div key={bid.id}>
              <p>Bid Amount: {bid.amount}</p>
              <p>Placed at: {new Date(bid.created).toLocaleString()}</p>
              {bid.listing.media.length > 0 && (
              <img
                src={bid.listing.media[0].url}
                alt={bid.listing.media[0].alt || "Media"}
              />
            )}
              <p>{bid.listing.title}</p>
              <p>{bid.listing.description}</p>
              <p>{bid.listing.endsAt}</p>

            </div>
          ))}
        </div>
      ) : (
        <p>No bids found for {username}</p>
      )}
    </div>
  );
};

export default BidsPage;
