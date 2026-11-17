import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Login from "./Pages/Login/Login";
import MainLayout from "./Layout/MainLayout/MainLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import BlogPosting from "./Components/BlogPosting/BlogPosting";
import BlogCategory from "./Components/BlogCategory/BlogCategory";
import BlogManagement from "./Components/BlogManagement/BlogManagement";
import BlogComments from "./Components/BlogComments/BlogComments";
import Enquiry from "./Components/Enquiry/Enquiry";
import TourBooking from "./Components/TourBooking/TourBooking";
import Gallary from "./Components/Gallary/Gallary";
import Hotelbooking from "./Components/Hotelbooking/Hotelbooking";
import Expores from "./Components/Expores/Expores";
import Testimonial from "./Components/Testimonial/Testimonial";
import Refunds from "./Components/Refunds/Refunds";

const App = () => {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Administrative Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/blog/posting" element={<BlogPosting />} />
            <Route path="/blog/category" element={<BlogCategory />} />
            <Route path="/blog/management" element={<BlogManagement />} />
            <Route path="/blog/comments" element={<BlogComments />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/tour-booking" element={<TourBooking />} />
            <Route path="/refunds" element={<Refunds />} />
            <Route path="/gallery" element={<Gallary />} />
            <Route path="/hotel-booking" element={<Hotelbooking />} />
            <Route path="/explores" element={<Expores />} />
            <Route path="/testimonials" element={<Testimonial />} />
            <Route path="/testimonial" element={<Testimonial />} />
          </Route>

          {/* Fallback to Dashboard / Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
};

export default App;