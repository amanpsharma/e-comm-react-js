import React, { useState, useEffect, useRef } from "react";
import "../Style/Homepage.css";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const shoeContentArray = [
  {
    title: "It's not just shoes",
    mainHeading: "It's Steve Madden",
    description:
      "Steve Madden shoes: A blend of fashion and comfort. Designed with precision and crafted from high-quality materials, their collection offers a variety of stylish options. Step into a world of elegance and confidence where each pair is a statement. Beyond shoes, Steve Madden promotes sustainability and community engagement.",
    buttonText: "Know more",
    image: {
      src: "/Images/img13.jpg",
      alt: "header-shoes",
      height: 350,
      width: 350,
    },
  },
  {
    title: "Classic Leather",
    mainHeading: "Timeless Elegance",
    description:
      "Handcrafted leather shoes that never go out of style. Experience comfort and durability while making a bold fashion statement with our exclusive leather collection.",
    buttonText: "Shop Now",
    image: {
      src: "/Images/img5.jpg",
      alt: "leather-shoes",
      height: 350,
      width: 350,
    },
  },
  {
    title: "Sneaker Revolution",
    mainHeading: "Urban Style",
    description:
      "Our sneakers combine street style with top-notch performance. Lightweight, comfortable, and available in vibrant colors, they're perfect for everyday wear.",
    buttonText: "Discover More",
    image: {
      src: "/Images/img15.jpg",
      alt: "sneakers-shoes",
      height: 350,
      width: 350,
    },
  },
];

export default function () {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef(null);
  const textRef1 = useRef(null);

  const [fade, setFade] = useState(true);
  useGSAP(() => {
    // The function to wrap the text in div elements
    const animation_text_1 = (element) => {
      const theText = element.current;
      let newText = "";
      for (let i = 0; i < theText.innerText.length; i++) {
        newText += "<div>";
        if (theText.innerText[i] === " ") {
          newText += "&nbsp;";
        } else {
          newText += theText.innerText[i];
        }
        newText += "</div>";
      }
      theText.innerHTML = newText;

      // Apply GSAP animation using querySelectorAll
      const divs = theText.querySelectorAll("div"); // Selecting the wrapped <div> elements

      gsap.fromTo(
        divs,
        {
          opacity: 0,
          y: 90,
          rotation: 360,
        },
        {
          duration: 2,
          opacity: 1,
          repeat: -1,
          y: 0,
          stagger: 0.03,
          ease: "elastic(1.2, 0.5)",
          scrollTrigger: {
            trigger: theText,
            start: "top 70%",
            toggleActions: "restart none none reverse",
          },
        }
      );
    };

    // Initialize the animation on component mount
    if (textRef.current || textRef1.current) {
      animation_text_1(textRef);
      animation_text_1(textRef1);
    }
  }, [currentIndex]);
  // useGSAP(() => {
  //   gsap.to(".para", {
  //     // x: 240,
  //     yoyo: true,
  //     repeat: -1,
  //     rotation: 360,
  //     duration: 2,
  //     ease: "elastic",
  //   });
  // }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === shoeContentArray.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      [img1Ref.current, img2Ref.current, img3Ref.current],
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.02,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: img1Ref.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
  }, []);
  const currentShoe = shoeContentArray[currentIndex];

  return (
    <div>
      <main className={`content-header ${fade ? "fade-in" : "fade-out"}`}>
        <div className="text para">
          <div className="text-5xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              <h2 className="flex" ref={textRef} id="text-anim">
                {currentShoe.title}
              </h2>
            </span>
          </div>
          <div className="text-5xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              <h1 className="flex" ref={textRef1} id="text-anim1">
                {currentShoe.mainHeading}
              </h1>
            </span>
          </div>
          <p>{currentShoe.description}</p>
          <a className="know-more-btn">{currentShoe.buttonText}</a>
        </div>
        <div className="image">
          <img
            src={currentShoe.image.src}
            alt={currentShoe.image.alt}
            height={currentShoe.image.height}
            width={currentShoe.image.width}
          />
        </div>
      </main>

      <footer>
        <img
          ref={img1Ref}
          src="/Images/img13.jpg"
          alt="header-shoes"
          height={120}
          width={120}
        />
        <img
          ref={img2Ref}
          src="/Images/img5.jpg"
          alt="header-shoes"
          height={120}
          width={120}
        />
        <img
          ref={img3Ref}
          src="/Images/img15.jpg"
          alt="header-shoes"
          height={120}
          width={120}
        />
      </footer>
    </div>
  );
}
