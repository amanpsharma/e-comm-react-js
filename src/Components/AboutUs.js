import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          About Us
        </h1>
        <p className="text-gray-600 mb-4 text-justify">
          Welcome to{" "}
          <span className="font-semibold text-gray-800">Shoe World</span>, your
          number one source for all things shoes. We're dedicated to giving you
          the very best of footwear, with a focus on quality, customer service,
          and uniqueness.
        </p>
        <p className="text-gray-600 mb-4 text-justify">
          Founded in 2024 by Aman Sharma, Shoe World has come a long way from its
          beginnings in a home office. When Jane first started out, her passion
          for eco-friendly and stylish shoes drove her to quit her day job, and
          gave her the impetus to turn hard work and inspiration into a booming
          online store. We now serve customers all over the world, and are
          thrilled to be a part of the quirky, eco-friendly, fair trade wing of
          the fashion industry.
        </p>
        <p className="text-gray-600 mb-4 text-justify">
          We hope you enjoy our products as much as we enjoy offering them to
          you. If you have any questions or comments, please don't hesitate to
          contact us.
        </p>
        <p className="text-gray-600 text-center">
          Sincerely,
          <br />
          <span className="font-semibold text-gray-800">Aman Sharma</span>
          <br />
          Founder, Shoe World
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
