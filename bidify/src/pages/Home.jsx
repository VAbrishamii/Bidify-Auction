import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import Carousel from "../components/Carousel";
import Pagination from "../components/pagination";
import FilterBar from "../components/FilterByTags";
import { useLocation } from "react-router-dom";
import useAuctipnAPI from "../constants/instance";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
/**
 * Home component that displays the main page of the application.
 * It fetches and displays listings, allows filtering by tags,
 * and handles pagination.
 * It uses React hooks for state management and side effects,
 * and integrates with the AuctionAPI service.
 *  It also includes a carousel for featured listings and a filter bar for tag selection.
 * It handles loading state and displays a message if no listings are available.
 */
const Home = () => {
  const { activeTag, setActiveTag, currentPage, setCurrentPage } =
    useAppContext();
  const auctionAPI = useAuctipnAPI();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;
  const location = useLocation();

  // Load listings
  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      try {
        let response;
        if (activeTag) {
          response = await auctionAPI.filterByTagAndActive(activeTag);
          setFilteredListings(response.data || []);
          setMeta({});
        } else {
          response = await auctionAPI.getALLListings(
            currentPage,
            itemsPerPage,
            "created",
            "desc"
          );
          setFilteredListings([]);
        }
        const { listings = [], meta = {} } = response || {};
        setListings(listings);
        setMeta(meta || {});
      } catch (error) {
        console.error("Error loading listings", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };
    loadListings();
  }, [auctionAPI, currentPage, activeTag]);

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTag(null);
      setCurrentPage(1);
    }
  }, [location.pathname, setActiveTag, setCurrentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag, setCurrentPage]);

  useEffect(() => {
    if (location.state?.newListing) {
      setListings((prev) => [location.state.newListing, ...prev]);
    }
  }, [location.state]);

  const displayedListings = activeTag
    ? filteredListings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : listings;
  useEffect(() => {
    if (!loading && displayedListings.length === 0) {
      toast("No listings found for this filter.");
    }
  }, [loading, displayedListings]);

  return (
    <div className="home-page animate-spinSlow">
      {loading && <Loader />}
      <>
        {/* Carousel */}
        <Carousel listings={displayedListings} />

        {/* Filter Bar */}
        <FilterBar activeTag={activeTag} setActiveTag={setActiveTag} />

        {/* Listings Section */}
        {displayedListings.length > 0 ? (
          <div className="listings">
            {displayedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="filter-result">No listings available.</p>
        )}

        {/* Pagination  for filted by tag*/}
        {activeTag && (
          <Pagination
            listings={filteredListings}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalPages={Math.ceil(filteredListings.length / itemsPerPage)}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        )}
        {/* Pagination for all listings, visible when no tag is active */}
        {!activeTag && (
          <Pagination
            listings={listings}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalPages={meta.pageCount || 1}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        )}
      </>
    </div>
  );
};

export default Home;
