// src/Components/Cart.js
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalQuantity,
  selectTotalAmount,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/product/cartSlice";
import { gsap } from "gsap";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);
  const cartRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    gsap.fromTo(
      cartRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="p-4" ref={cartRef}>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="mb-4 p-4 border rounded-lg shadow-lg flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={item.colors[0].images[0]}
                    alt={item.name}
                    className="w-16 h-16 mr-4 rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Brand: {item.brand}</p>
                    <p className="text-gray-600">Category: {item.category}</p>
                    <p className="text-gray-600">
                      Sub-Category: {item.sub_category}
                    </p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-800 font-bold">
                      Price: ${item.price.discounted}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-2"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Total Items: {totalQuantity}
            </p>
            <p className="text-lg font-semibold">
              Total Amount: ${totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
