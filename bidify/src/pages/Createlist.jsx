import React from "react";
import AuctionAPI from "../service/AuctionAPI";
import ImageUploader from "../components/ImageUploader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

/**
 * Createlist component allows users to create a new auction listing.
 * It provides a form for entering listing details such as title, description, tags, image, and end date.
 *  It handles form submission, image uploads, and validation of the end date.
 * It uses React hooks for state management and integrates with the AuctionAPI service.
 */
const Createlist = () => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    tags: "",
    image: [],
    endDateTime: new Date().toISOString().slice(0, 16),
  });

  const [loading, setLoading] = React.useState(false);
  const auctionAPI = new AuctionAPI();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "endDateTime" ? value.slice(0, 16) : value,
    }));
  };

  const handleImageUpload = (imageUrls) => {
    "imageUrl", imageUrls;
    setFormData((prev) => ({ ...prev, image: imageUrls }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endDate = new Date(formData.endDateTime);

      if (isNaN(endDate.getTime())) {
        toast.error("Please provide a valid end date.");
        return;
      }
      if (endDate < new Date()) {
        toast.error("End date must be in the future.");
        return;
      }

      const data = {
        title: formData.title,
        description: formData.description,
        tags: [formData.tags],

        media: formData.image.map((url) => ({ url, alt: "Auction Image" })),
        endsAt: endDate.toISOString(),
      };

      const response = await auctionAPI.createListing(data);
      toast.success("Listing created successfully");

      navigate("/", { state: { newListing: response.data } });
    } catch (error) {
      console.error("createListing error", error);
      toast.error("An error occurred while creating the listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <h1>Create Auction Listing</h1> */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags:</label>
          <select
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required>
            <option value="">Select a category</option>
            <option value="art">Art</option>
            <option value="electronics">Electronics</option>
            <option value="decorative">Decorative</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image: </label>
          <ImageUploader onImageUploaded={handleImageUpload} />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDateTime"
            value={formData.endDateTime}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
};

export default Createlist;
