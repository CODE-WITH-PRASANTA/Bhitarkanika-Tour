import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import BlogPosting from "./Components/BlogPosting/BlogPosting";
import BlogManagement from "./Components/BlogManagement/BlogManagement";
import Enquiry from "./Components/Enquiry/Enquiry";
import TourBooking from "./Components/TourBooking/TourBooking";
import Gallary from "./Components/Gallary/Gallary";
import Hotelbooking from "./Components/Hotelbooking/Hotelbooking";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/blog/posting" element={<BlogPosting />} />
          <Route path="/blog/management" element={<BlogManagement />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/tour-booking" element={<TourBooking />} />
          <Route path="/gallery" element={<Gallary />} />
          <Route path="/hotel-booking" element={<Hotelbooking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;