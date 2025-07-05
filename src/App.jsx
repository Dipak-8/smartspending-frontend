import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Items from "./pages/Items";
import ComparisonPage from "./components/ComparisonPage";
import OAuthSuccess from "./pages/OAuthSuccess";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
    </>
  );
}

export default App;