import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import Layout from "./components/Layout";
import Createlist from "./pages/Createlist";
import ListingDetails from "./pages/ListingDetails";


function App() {
  return (
    <>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Edit" element={<Edit />} />
        <Route path="/createlist" element={<Createlist />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
      </Routes>
      </Layout>
    </>
  );
}


export default App;
