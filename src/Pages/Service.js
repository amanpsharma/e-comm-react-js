import React, { useState, useEffect } from "react";
import "../Style/ServicePage.css";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  selectCartItems,
  removeCartLink,
} from "../features/product/cartSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
const Service = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartItems = useSelector(selectCartItems);
  const location = useLocation();
  const params = useParams();
  useEffect(() => {
    if (cartItems.length > 0 && location?.pathname === "/your-cart") {
      setFilteredProducts(cartItems);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      fetch("/product.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data);
          setTimeout(() => {
            setLoading(false);
          }, 500);
          if (params.slug) {
            const slugProduct = data.filter((item) =>
              item.tags.includes(params.slug)
            );
            setFilteredProducts(slugProduct);
          } else {
            setFilteredProducts(data); // Initially, show all products
          }
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [location?.pathname]);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(
      removeCartLink({ name: "Cart", href: "/your-cart", current: false })
    );
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      // draggable: true,
      // progress: undefined,
      // theme: "colored",
      // transition: 'Bounce',
    });
  };

  if (loading) {
    return (
      <div
        id="main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="loading"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }
  return (
    <div className="product-list">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="product-list"
      >
        {filteredProducts?.map((item) => (
          <motion.div key={Math.random()} className="cont" variants={item}>
            <div className="product-card">
              <Link
                to={{
                  pathname: `/products-details/${item.id}`,
                  state: { item },
                }}
              >
                <div className="product-card__image">
                  <motion.img
                    whileHover={{ scale: 1.2 }}
                    src={item.colors[0].images[0]}
                    alt={item.name}
                  />
                </div>
              </Link>
              <div className="product-card__info">
                <h2 className="product-card__title">{item.name}</h2>
                <div className="product-card__price-row">
                  <span className="product-card__price">
                    ${item.price.discounted}
                  </span>
                  {location?.pathname !== "/your-cart" ? (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="bg-gray-500 hover:bg-blue-700 text-white font-bold ml-10 py-2 px-4 rounded-full"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </motion.button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Service;
