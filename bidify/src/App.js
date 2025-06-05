import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Edit from "./pages/Edit";
import { AppProvider } from "./context/AppContext";
import "./index.css";

function App() {
  return (
    <>
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Profile/:username" element={<Profile />} />
            <Route path="/profile/bids/:username" element={<BidsPage />} />
            <Route
              path="/Edit/:username"
              element={
                <AuthGuard>
                  {" "}
                  <Edit />
                </AuthGuard>
              }
            />
            <Route
              path="/Createlist"
              element={
                <AuthGuard>
                  {" "}
                  <Createlist />{" "}
                </AuthGuard>
              }
            />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/Search" element={<SearchResults />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
