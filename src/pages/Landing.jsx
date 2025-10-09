import React from "react";
import { Link } from "react-router-dom";

import "../styles/landing.css";
import "../styles/index.css";

import blueU from "../assets/images/blue-u.png";
import greenSaw from "../assets/images/green-saw.png";
import pinkFlower from "../assets/images/pink-flower.png";
import orangeFlower from "../assets/images/orange-flower.png";
import purpleBolt from "../assets/images/purple-bolt.png";
import yellowStar from "../assets/images/yellow-asterisk.png";

function Landing() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-200 to-rose-100">
      {/* Images */}
      <img
        src={blueU}
        alt="Blue U"
        className="animate-bounce absolute top-1/8 left-1/7 w-36 rotate-6"
      />
      <img
        src={greenSaw}
        alt="Green Saw"
        className="slow-spin-rev absolute top-1/2 right-1/5 w-28 -rotate-12"
      />
      <img
        src={pinkFlower}
        alt="Pink Flower"
        className="animate-bounce absolute bottom-1/6 right-1/12 w-20 rotate-3"
      />
      <img
        src={orangeFlower}
        alt="Orange Flower"
        className="slow-spin-rev absolute top-10 right-20 w-24 rotate-12"
      />
      <img
        src={yellowStar}
        alt="Yellow Star"
        className="slow-spin-rev absolute bottom-1/2 left-1/30 w-24 rotate-12"
      />
      <img
        src={purpleBolt}
        alt="Purple Bolt"
        className="slow-spin absolute bottom-1/12 left-1/4 w-15 -rotate-6"
      />

      <div className="md:flex flex-col items-center justify-center">
        <div>
          <h1
            className="text-6xl pb-7 fade-in-up"
            style={{ fontFamily: "Urbanist-Bold, sans-serif" }}
          >
            Nav<span className="text-sky-700">ink</span>
          </h1>
        </div>
        <div className="md:flex flex-col items-center justify-center">
          <h2
            className="text-2xl fade-in-up fade-in-up-delay "
            style={{ fontFamily: "Poppins-Bold, sans-serif", color: "#23262D" }}
          >
            Your Vision, Printed.
          </h2>
          <p
            className="md:flex flex-col items-center justify-center"
            style={{
              fontFamily: "Poppins-Medium, sans-serif",
              color: "#919497ff",
            }}
          >
            <span className="block fade-in-up fade-in-up-delay ">
              Turning imagination into ink, and
            </span>
            <span className="block pb-7 fade-in-up fade-in-up-delay ">
              concepts into reality.
            </span>
          </p>
        </div>

        <div className="fade-in-delay  w-50 bg-sky-700 text-white rounded-full py-2.5 -mb-0.5 font-medium hover:bg-sky-800 transition cursor-pointer">
          <Link to="/login">
            <button type="submit" className="w-full">
              Start Printing
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
