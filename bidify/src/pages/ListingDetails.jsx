// import React, { useEffect,useState } from "react";

// import auctionAPI from "../api/auctionAPI"; 

// const ListingDetails = ({ id }) => {
//     const [listing, setListing] = useState(null);

//     useEffect(() => {
//         const loadDetailsListing = async () => {
//             try {
//                 const listingData = await auctionAPI.getListingById(id);
//                 console.log("listingData", listingData);

//                 if (listingData) {
//                     setListing(listingData.data); // Assuming the data structure has a `.data` field
//                 } else {
//                     console.error("Error loading listing", listingData);
//                     setListing(null);
//                 }
//             } catch (error) {
//                 console.error("Error loading listing", error);
//                 setListing(null);
//             }
//         };

//         loadDetailsListing(); // Make sure to invoke the async function here

//     }, [id]); // Effect depends on the `id` prop, so it runs when `id` changes

//     if (!listing) return <p>Loading...</p>;

//     return (
//         <div className="listing-details">
//             {/* Render the listing details here */}
//         </div>
//     );
// };

// export default ListingDetails;
