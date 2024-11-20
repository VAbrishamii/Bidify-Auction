import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Layout>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      </Layout>
    </>
  );
}


export default App;
