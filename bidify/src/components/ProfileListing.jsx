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
        console.log("fetchedListings", fetchedListings);
        setListings(fetchedListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [userName]);

  const handleDelete = async (listingId) => {
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
      {listings.data.length > 0 ? (
        <div>
          {listings.data.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing} // Pass the listing data as a prop
              onDelete={handleDelete} // Pass the handleDelete function as a prop
            />
          ))}
        </div>
      ) : (
        <p>No listings found for {userName}</p>
      )}
    </div>
  );
};
export default Listings;
