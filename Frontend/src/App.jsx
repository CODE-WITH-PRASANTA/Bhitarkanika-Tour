
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import ContactMain from "./Components/ContactMain/ContactMain";
import BlogMain from "./Components/BlogMain/BlogMain";
import GalleryMain from "./Components/GalleryMain/GalleryMain";
import FaqMain from "./Components/FaqMain/FaqMain";
import ServiceMain from "./Components/ServiceMain/ServiceMain";
import About from "./Pages/About/About";
import FloatingIcons from "./Components/FloatingIcons/FloatingIcons";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Topbar />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactMain/>} />
        <Route path="/blog" element={<BlogMain/>} />
        <Route path="/gallery" element={<GalleryMain/>} />
        <Route path="/faq" element={<FaqMain/>} />
        <Route path="/service" element={<ServiceMain/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/blog-details" element={<BlogDetails/>} />
      </Routes>

      <Footer />
      <FloatingIcons/>
    </BrowserRouter>
  );
};

export default App;