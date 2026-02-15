import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const HeroSection = () => {
  return (
    <main>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="max-w-[1240px] md:pt-24 pt-10 mx-auto h-full flex flex-col">
        <div className="flex flex-col md:text-center text-start sm:text-center md:px-0 px-4 justify-center md:items-center items-start sm:items-center pt-10">
          <h1 className="md:text-4xl sm:text-2xl text-[20px] max-w-[800px] font-semibold text-customBlue">
            Unleashing Innovation: IT Day Celebrates Student Talent Across
            Disciplines
          </h1>
          <p className="md:text-xl text-base max-w-[900px] pt-2 md:pt-4 text-gray-500">
            IT-DAY at Jamhuuriya University is a special event where Computer
            Science students showcase their projects and innovations. It’s a day
            of inspiration and opportunity
          </p>
          <div className="flex gap-4 py-4">
            <Link to="/register">
              <button className="md:py-3 h-12 py-2 sm:py-2  px-3 sm:px-4 md:px-6 bg-customGreen text-white rounded-md  text-sm font-medium">
                Register Now
              </button>
            </Link>

            <Link to="/about">
              <button className="items-center justify-center rounded-md border border-gray-200 bg-white md:py-3 h-12 py-2 sm:py-2  px-3 sm:px-4 md:px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-200 text-customBlue disabled:pointer-events-none disabled:opacity-50">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        <div className="md:w-full  flex justify-center md:px-10 px-4 py-5">
          <img
            className="w-[1140px] mx-auto rounded-md"
            src="./hero-image.jpg"
            alt=""
          />
          <div></div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
