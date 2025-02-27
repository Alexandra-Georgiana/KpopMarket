import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Heather from "./comonents/Heather";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Signup from "./pages/SignUp";
import Login from "./pages/Login"; 
import Footer from "./comonents/Footer";
import ArtistProducts from "./pages/ArtistProduct";
import Album from "./pages/Albums";
import Mearch from "./pages/Mearch";
import Love from "./assets/Love.png";
import Sale from "./pages/SalePg";
import Latest from "./pages/LatestPg";
import Trending from "./pages/PopularPg";
import SearchResults from "./comonents/SearchResults";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";


export default function App() {
  const [showSticker, setShowSticker] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.8; 
      if (window.scrollY > scrollThreshold) {
        setShowSticker(true);
      } else {
        setShowSticker(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#f8d4da] text-[#3a2a67] relative">
      {/* Love Sticker with Jump Effect */}
      <img
        src={Love}
        alt="Love"
        className={`fixed bottom-0 right-0 w-[500px] h-[600px] z-[9999] drop-shadow-2xl transition-all duration-700 ${
          showSticker ? "translate-y-0 opacity-100" : "translate-y-[100px] opacity-0"
        }`}
      />

      <BrowserRouter>
        <Heather />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist/:artistName" element={<ArtistProducts />} />
          <Route path="/alb/:category" element={<Album />} />
          <Route path="/mrch/:category" element={<Mearch />} />
          <Route path="/sale-pg" element={<Sale />} />
          <Route path = "/late-pg" element = {<Latest />} />
          <Route path = "/pop-pg" element = {<Trending />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart-pg" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/not_found" element={<NotFound />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}
