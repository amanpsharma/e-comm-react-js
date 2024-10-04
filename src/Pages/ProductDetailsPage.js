import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function ProductDetailsPage() {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(
    singleProduct?.size_guide[0]
  ); // Default to the first country in JSON
  const [selectedSize, setSelectedSize] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    fetch("/product.json")
      .then((response) => response.json())
      .then((data) => {
        const product = data.find((item) => item.id === Number(id));
        setSingleProduct(product);
        setSelectedCountry(Object.keys(product.size_guide)[0]);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [id]);

  const changeImage = (index) => {
    setSelectedImageIndex(index);
  };

  const handleColorChange = (colorIndex) => {
    setSelectedColor(colorIndex);
    changeImage(singleProduct.colors[colorIndex].images[0]);
    setSelectedImageIndex(0);
    setSelectedSize("");
    setSelectedCountry(Object.keys(singleProduct.size_guide)[0]);
  };
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === singleProduct.colors[selectedColor].images.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0
        ? singleProduct.colors[selectedColor].images.length - 1
        : prevIndex - 1
    );
  };
  if (!singleProduct) {
    return <div>Loading...</div>;
  }

  const {
    name,
    brand,
    description,
    price,
    colors,
    reviews,
    features,
    shipping,
    tags,
    size_guide,
  } = singleProduct;

  return (
    <div className="bg-white-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8 relative">
            <motion.img
              key={selectedImageIndex}
              src={colors[selectedColor].images[selectedImageIndex]}
              alt={name}
              className="w-full h-auto rounded-lg shadow-md mb-4"
              id="mainImage"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            />

            {/* Left Arrow */}
            <button
              className="absolute w-10 top-1/2 left-4 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200"
              onClick={handlePreviousImage}
              style={{ zIndex: 10 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              className="absolute w-10 top-1/2 right-4 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200"
              onClick={handleNextImage}
              style={{ zIndex: 10 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Thumbnail Images */}
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {colors[selectedColor].images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300 ${
                    selectedImageIndex === index
                      ? "ring-2 ring-indigo-600 opacity-100"
                      : ""
                  }`}
                  onClick={() => changeImage(index)}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>
          {/* 98453-34467 */}
          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <motion.h2
              whileHover={{ scale: 1.1 }}
              className="text-3xl font-bold mb-2 cursor-pointer"
            >
              {name}
            </motion.h2>
            <p className="text-gray-600 mb-4">Brand: {brand}</p>
            <p className="text-gray-600 mb-4">SKU: {singleProduct.id}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">
                ${price.discounted}
              </span>
              <span className="text-gray-500 line-through">
                ${price.original}
              </span>
              <span className="text-green-500 ml-2">
                {price.discount_percentage}% off
              </span>
            </div>
            {/* shoes size */}

            <div className="size-selector">
              {/* Country Selector */}
              <div className="flex gap-4 mb-4">
                {Object.keys(size_guide).map((country) => (
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    key={country}
                    className={`cursor-pointer px-4 py-2 border rounded-lg text-sm ${
                      selectedCountry === country
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setSelectedCountry(country)}
                  >
                    {country}
                  </motion.span>
                ))}
              </div>

              {/* Display Sizes based on Selected Country */}
              <div>
                <h5 className="font-medium mb-2">{selectedCountry} Sizes:</h5>
                <div className="flex flex-wrap gap-2">
                  {size_guide[selectedCountry]?.map((size) => (
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      key={`${selectedCountry}-${size}`}
                      className={`cursor-pointer px-4 py-2 border rounded-lg text-sm ${
                        selectedSize === size
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
            {/* Ratings */}
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`size-6 ${
                    i < Math.round(reviews.average_rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">
                {reviews.average_rating} ({reviews.total_reviews} reviews)
              </span>
            </div>

            <p className="text-gray-700 mb-6">{description}</p>

            {/* Color Options */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Color:</h3>
              <div className="flex space-x-2">
                {colors.map((color, index) => (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    key={index}
                    className={`w-8 h-8 rounded-full focus:outline-none ${
                      selectedColor === index
                        ? "ring-2 ring-indigo-600"
                        : "border"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleColorChange(index)}
                  ></motion.button>
                ))}
              </div>
            </div>

            {/* Quantity Input */}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity:
              </label>
              <div className="flex">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setQuantity((add) => add + 1)}
                  className="w-10 bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  +
                </motion.button>
                <label className="p-2">{quantity}</label>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setQuantity((min) => min - 1)}
                  className={
                    quantity > 1
                      ? "w-10 bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      : "cursor-not-allowed w-10 bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  }
                  type="button"
                  disabled={quantity > 1 ? false : true}
                >
                  -
                </motion.button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="justify-center text-center bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="justify-center bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Wishlist
              </motion.button>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
          <p className="text-gray-600">Weight: {shipping.weight}</p>
          <p className="text-gray-600">
            Dimensions: {shipping.dimensions.length} x{" "}
            {shipping.dimensions.width} x {shipping.dimensions.height}
          </p>
          <p className="text-gray-600">
            Estimated Delivery: {shipping.estimated_delivery_days} days
          </p>
        </div>
        {/* Tags */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.span
                whileHover={{ scale: 1.1 }}
                key={index}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-300"
              >
                <Link
                  to={{
                    pathname: `/products/${tag}`,
                  }}
                >
                  {tag}
                </Link>
              </motion.span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
          {reviews.top_reviews.map((review, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-md font-semibold">{review.title}</h4>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-sm text-gray-500">
                {review.username} - {new Date(review.date).toDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
