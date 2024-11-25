import React from "react";
import AuctionAPI from "../service/AuctionAPI";
import ImageUploader from "../components/ImageUploader";

const Createlist = () => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    tags: "",
    image: "",
    endDateTime: "",
  });

  const [loading, setLoading] = React.useState(false);

  const auctionAPI = new AuctionAPI();

  

  const handleChange = (e) => {
    const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl) => { 
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(',').map((tag) => tag.trim()), // Split and trim tags
        media: formData.image, 
        endDate: formData.endDate,
    };
    const response = await auctionAPI.createListing(data);
    alert('Listing created successfully');
    console.log('createListing response', response);
    window.location.href = '/';

  }catch (error) {
    console.error('createListing error', error);
    alert('An error occurred while creating the listing');
  } finally {
    setLoading(false);
  }
}

return (   <div>
  <h1>Create Auction Listing</h1>
  <form onSubmit={handleSubmit}>
      <div>
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

      <div>
          <label htmlFor="description">Description:</label>
          <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
          />
      </div>

      <div>
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
          />
      </div>

      <div>
          <label htmlFor="image">Image: <ImageUploader onImageUploaded={handleImageUpload} /></label>
      </div>

      <div>
          <label htmlFor="endDate">End Date:</label>
          <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
          />
      </div>

      <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Create Listing'}
      </button>
  </form>
</div>
);
};

export default Createlist;