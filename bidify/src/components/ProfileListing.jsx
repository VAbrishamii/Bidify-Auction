import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import AuctionAPI from "../service/AuctionAPI";
import ListingCard from "./ListingCard";

const Listings = ({ userName }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const api = new AuctionAPI();
        const fetchedListings = await api.allListingsByProfile(userName);
        setListings(fetchedListings.data || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [userName]);

  const handleDelete = async (listingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmed) return;
    try {
      const api = new AuctionAPI();
      await api.deleteListing(listingId);
      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== listingId)
      );
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {listings.length > 0 ? (
        <div className="listings">
          {listings.map((listing) => (
            <div key={listing.id} className="listing-container">
              {/* Listing Card */}
              <ListingCard listing={listing} />
              {/* Trash Icon for Delete */}
              <button
                className="delete-button"
                onClick={() => handleDelete(listing.id)}
                aria-label={`Delete ${listing.title}`}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No listings found for {userName}</p>
      )}
    </div>
  );
};
export default Listings;
