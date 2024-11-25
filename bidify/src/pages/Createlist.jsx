import React from "react";
import AuctionAPI from "../service/AuctionAPI";
import ImageUploader from "../components/ImageUploader";

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
    console.log('name ^ value', name, value);

    if (name === 'endDateTime') {
      const formattedDate = value.slice(0, 16);
        setFormData((prev) => ({ ...prev, [name]: formattedDate}));
    }else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (imageUrls) => { 
    console.log('imageUrl', imageUrls);
    setFormData((prev) => ({ ...prev, image: imageUrls }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      console.log('FormData', formData);

      const endDate = new Date(formData.endDateTime);
  
      if (isNaN(endDate.getTime())) { 
        alert('Please provide a valid end date.');
        setLoading(false);
        return;
      }

      if (endDate < new Date()) {
        alert('End date must be in the future.');
        setLoading(false);
        return;
      }
  
      const endsAt = endDate.toISOString();

      const data = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(',').map((tag) => tag.trim()), 
        media: formData.image.map((url) => ({ url, alt: "Auction Image" })),
        // media: formData.image ? [{ url: formData.image, alt: "Auction Image" }] : [],
        endsAt: endsAt,
    };

    console.log('request data', data);

    const response = await auctionAPI.createListing(data);
    // alert('Listing created successfully');
    console.log('createListing response', response);
    // window.location.href = '/';

  }catch (error) {
    console.error('createListing error', error);
    alert('An error occurred while creating the listing');
  } finally {
    setLoading(false);
  }
}

return (   
<div>
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
          <label htmlFor="image">Image: </label> 
          <ImageUploader onImageUploaded={handleImageUpload} />
      </div>

      <div>
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

      <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Create Listing'}
      </button>
  </form>
</div>
);
};

export default Createlist;