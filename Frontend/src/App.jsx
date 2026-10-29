
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
import BoatService from "./Pages/BoatService/BoatService";
import MigratoryBirds from "./Pages/MigratoryBirds/MigratoryBirds";
import SaltWaterCrocodile from "./Pages/SaltWaterCrocodile/SaltWaterCrocodile";
import MangroveForest from "./Pages/MangroveForest/MangroveForest";
import SkyWalk from "./Pages/SkyWalk/SkyWalk";
import Deer from "./Pages/Deer/Deer";
import WhiteCrocodile from "./Pages/WhiteCrocodile/WhiteCrocodile";
import JungleTrakking from "./Pages/JungleTrakking/JungleTrakking";
import Museum from "./Pages/Museum/Museum";
import NarrowCreek from "./Pages/NarrowCreek/NarrowCreek";
import OliveRidleyTurtles from "./Pages/OliveRidleyTurtles/OliveRidleyTurtles";
import SeaFood from "./Pages/SeaFood/SeaFood";
import HuntingTower from "./Pages/HuntingTower/HuntingTower";
import EVVechile from "./Pages/EVVechile/EVVechile";

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





        <Route path="/services/boat-service" element={<BoatService/>} />
        <Route path="/services/migratory-birds-point" element={<MigratoryBirds/>} />
        <Route path="/services/saltwater-crocodiles" element={<SaltWaterCrocodile/>} />
        <Route path="/services/mangrove-forests" element={<MangroveForest/>} />
        <Route path="/services/sky-walk" element={<SkyWalk/>} />
        <Route path="/services/deer" element={<Deer/>} />
        <Route path="/services/white-crocodile" element={<WhiteCrocodile/>} />
        <Route path="/services/jungle-trekking" element={<JungleTrakking/>} />
        <Route path="/services/museum" element={<Museum/>} />
        <Route path="/services/narrow-creek" element={<NarrowCreek/>} />
        <Route path="/services/olive-ridley-turtles" element={<OliveRidleyTurtles/>} />
        <Route path="/services/sea-food" element={<SeaFood/>} />
        <Route path="/services/hunting-tower" element={<HuntingTower/>} />
        <Route path="/services/ev-vehicle-service" element={<EVVechile/>} />
      </Routes>

      <Footer />
      <FloatingIcons/>
    </BrowserRouter>
  );
};

export default App;