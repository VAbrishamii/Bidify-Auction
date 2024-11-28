// import React, { useState } from "react";
// import axios from "axios";

// const EditComponent = ({ userData, onProfileUpdate }) => {
//   const [formData, setFormData] = useState({
//     name: userData.name || "",
//     email: userData.email || "",
//     avatar: userData.avatar || "",
//     bio: userData.bio || "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.put(
//         `/auction/profiles/${formData.name}`,
//         {
//           avatar: formData.avatar,
//           bio: formData.bio,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your auth mechanism
//           },
//         }
//       );
//       alert("Profile updated successfully!");
//       onProfileUpdate(response.data); // Update parent component with new data
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           disabled
//         />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           disabled
//         />
//       </label>
//       <br />
//       <label>
//         Avatar URL:
//         <input
//           type="url"
//           name="avatar"
//           value={formData.avatar}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Bio:
//         <textarea
//           name="bio"
//           value={formData.bio}
//           onChange={handleChange}
//         ></textarea>
//       </label>
//       <br />
//       <button type="submit">Update Profile</button>
//     </form>
//   );
// };

// export default EditComponent;
