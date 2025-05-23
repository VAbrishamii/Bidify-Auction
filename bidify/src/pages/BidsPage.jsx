import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuctionAPI from "../service/AuctionAPI";
import { Link } from "react-router-dom";

const BidsPage = () => {
  const { username } = useParams();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const api = new AuctionAPI();
        const fetchedBids = await api.allBidsByProfile(username);
        console.log("fetchedBids", fetchedBids);
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
    <div>
      <h1 className="flex items-center justify-center font-semibold text-gray-dark dark:text-gray-light">
        Bids made by {username}
      </h1>
      {bids.data.length > 0 ? (
        <div className="listings">
          {bids.data.map((bid) => (
            <div key={bid.id} className="listing-card">
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

              {/* Add View Details Link */}
              <Link
                aria-label="Go to Details List Page"
                to={`/listing/${bid.listing.id}`}
                className="view-details-link">
                View Details
              </Link>
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
