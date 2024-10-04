import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import Service from "./Pages/Service";
import Footer from "./Components/Footer";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import Navbar from "./Components/Navbar";
import ProductForm from "./Components/ProductForm";
import Home from "./Pages/Home";
import AboutUs from "./Components/AboutUs";
import Auth from "./Components/Auth";
import RegisterForm from "./Components/Registration";
import Cart from "./Components/Cart";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Service />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/products-details/:id"
              element={<ProductDetailsPage />}
            />
            <Route path="/product-form" element={<ProductForm />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            // pauseOnFocusLoss
            // draggable
            // pauseOnHover
            // theme="colored"
            // transition="Bounce"
          />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
