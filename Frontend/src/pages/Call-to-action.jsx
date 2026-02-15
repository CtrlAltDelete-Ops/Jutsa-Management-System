import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="w-full  py-10 md:py-20 lg:py-20  border-b border-t flex flex-col justify-center items-center">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black">
            Join us today
          </h2>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl text-gray-500">
            join us for a day of inspiration and creativity. Don't miss out—be
            part of the excitement! Join us now!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex h-12 items-center justify-center rounded-md px-5  text-gray-50 shadow transition-colors focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 bg-customGreen"
              href="#"
            >
              Register Now
            </Link>
            <Link
              to="/about"
              className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors text-customBlue hover:bg-gray-200  disabled:pointer-events-none disabled:opacity-50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
