import {useEffect, useState} from 'react';
import { getAllListings } from '../service/all_listing';
import ListingCard from '../components/ListingCard';

const Home = () => {
    const [listings, setListings] = useState([]);
    console.log('listings', listings);
    useEffect(() => {
      const loadListings = async () => {
        const listingsData = await getAllListings();
        console.log('listingsData', listingsData);  
        setListings(listingsData);
      };
      loadListings();
    }, []);

    return (
        <div className="home-page">
      <h1>Auction Listings</h1>
      {listings.length > 0 ? (
        <div className="listings">
          {listings.map((listing) => (
            <ListingCard key={listing.data} listing={listing} />
          ))}
        </div>
      ) : (
        <p>No listings available.</p>
      )}
    </div>
  );
};

export default Home;