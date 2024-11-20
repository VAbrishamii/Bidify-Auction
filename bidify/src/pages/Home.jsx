
import React, {useEffect, useState} from 'react';
import { getAllListings } from '../service/all_listing';
import ListingCard from '../components/ListingCard';

const Home = () => {
    const [listings, setListings] = useState([]);
    console.log('listings', listings);
    useEffect(() => {
      console.log('useEffect');
      const loadListings = async () => {
        console.log('inside loadListings');
        try{  
          const listingsData = await getAllListings();
          console.log('listingsData', listingsData);  
          setListings(listingsData);
        }catch(error){
          console.error("Error loading listings", error);
        }
      
      };
      loadListings();
    }, []);

    return (
        <div className="home-page">
      <h1>Auction Listings</h1>
      {listings.length > 0 ? (
        <div className="listings">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p>No listings available.</p>
      )}
    </div>
  );
};

export default Home;