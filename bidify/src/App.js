import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import Createlist from "./pages/Createlist";
import ListingDetails from "./pages/ListingDetails";
import AuthGuard from "./components/AuthGuard";
import SearchResults from "./pages/SearchResult";
import BidsPage from "./pages/BidsPage";
import EditPage from "./pages/Edit";


function App() {
  return (
    <>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile/:username" element={<Profile />} />
        <Route path="/profile/bids/:username" element={<BidsPage />} />
        <Route path="/Edit" element={<AuthGuard> <EditPage /></AuthGuard>} />
        <Route path="/Createlist" element={<AuthGuard> <Createlist /> </AuthGuard>} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/Search" element={<SearchResults/>} />
      </Routes>
      </Layout>
    </>
  );
}


export default App;
