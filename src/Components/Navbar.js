import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaBars, FaUser, FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNavigation,
  selectCartItems,
} from "../features/product/cartSlice";
import { logout } from "../features/product/authSlice";
import { useAuth } from "../firebase/auth";
import gsap from "gsap";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const images = [
  "/Images/img1.jpg",
  "/Images/img2.jpg",
  "/Images/img3.jpg",
  "/Images/img4.jpg",
  "/Images/img5.jpg",
];

export default function Navbar() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const navigation = useSelector(selectNavigation);
  const { user } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const imageRef = useRef(null);
  const imageIndexRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      imageIndexRef.current = (imageIndexRef.current + 1) % images.length;
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        onComplete: () => {
          imageRef.current.src = images[imageIndexRef.current];
          gsap.to(imageRef.current, { opacity: 1, duration: 1 });
        },
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = () => {
    dispatch(logout());
    setIsProfileMenuOpen(false);
  };

  const handleScroll = () => {
    console.log(lastScrollY, "lastScrollY", window.scrollY);
    if (window.scrollY > lastScrollY.current) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    lastScrollY.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Disclosure
      as="nav"
      className={`bg-gray-800 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0">
                  <img
                    ref={imageRef}
                    className="h-8 w-8"
                    src={images[0]}
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )
                        }
                      >
                        {item.name === "Cart"
                          ? `${item.name} ${
                              cartItems.length > 0 ? `(${cartItems.length})` : ""
                            }`
                          : item.name}
                      </NavLink>
                    ))}
                    {user && (
                      <button
                        onClick={handleSignOut}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <FaBell className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={handleProfileMenuToggle}
                      className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">Open user menu</span>
                      <FaUser
                        color="white"
                        className="h-6 w-6 rounded-full"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Your Profile
                      </NavLink>
                      <NavLink
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Settings
                      </NavLink>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DisclosurePanel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              {user && (
                <button
                  onClick={handleSignOut}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
