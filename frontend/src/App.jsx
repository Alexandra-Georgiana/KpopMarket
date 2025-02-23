import { BrowserRouter, Route, Routes } from "react-router-dom";
import Heather from "./comonents/Heather";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LogIn from "./pages/Login";
import Footer from "./comonents/Footer";

export default function App() {
  return (
    <main className="min-h-screen bg-[#f8d4da] text-[#3a2a67]"> 
      <BrowserRouter>
        <Heather />
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/alb" element={<Category />} />
          <Route path = "/mrch" element={<Category />} />
          <Route path = "/art" element={<Category />} />
          <Route path = "/sale" element={<Category />} />
          <Route path = "/cstm" element={<Category />} />
          <Route path = "/rwd" element={<Category />} />
          <Route path = "/product" element={<Product />}/>
            <Route path=":producId" element={<Product />} />
          <Route/>
          <Route path = "/cart-pg" element={<Cart />} />
          <Route path = "/login" element={<LogIn />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  )
}