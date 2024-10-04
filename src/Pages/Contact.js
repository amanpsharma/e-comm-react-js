import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../Style/ContactPage.css";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await emailjs.send(
        "default_service", // Replace with your EmailJS service ID
        "template_j5afu95", // Replace with your EmailJS template ID
        formData,
        "mHQ8C3uTpthloT7aC"
      );

      console.log(result.text);
      alert("Email sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-center" >
          <motion.button
            whileHover={{ scale: 1.2 }}
            className="bg-gray-500 w-60 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Submit
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
