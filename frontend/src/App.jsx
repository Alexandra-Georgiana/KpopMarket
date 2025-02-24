import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Heather from "./comonents/Heather";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LogIn from "./pages/Login";
import Footer from "./comonents/Footer";
import ArtistProducts from "./pages/ArtistProduct";
import Album from "./pages/Albums";
import Mearch from "./pages/Mearch";
import Love from "./assets/Love.png";

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
          <Route path="/alb" element={<Category />} />
          <Route path="/mrch" element={<Category />} />
          <Route path="/art" element={<Category />} />
          <Route path="/sale" element={<Category />} />
          <Route path="/cstm" element={<Category />} />
          <Route path="/rwd" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path=":producId" element={<Product />} />
          <Route path="/cart-pg" element={<Cart />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}
