import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="bg-gray-100">
      <div className="flex  flex-col max-w-[1200px] md:px-0 px-4  md:h-full py-10 h-full mx-auto">
        <div className="flex flex-col  justify-center items-center">
          <h1 className="max-w-xl text-3xl font-bold text-customBlue">
            About Us
          </h1>
          <p className="max-w-3xl text-gray-500 text-center mt-2">
            Learn more about Jutsa and what we do to help students succeed in
            the tech industry. We are a community of IT students dedicated to
            helping each other grow and learn.
          </p>
        </div>
        <div className="p-2   flex flex-col px-4 md:px-0 md:flex-row gap-4 pt-5 justify-center">
          <div className="max-w-md flex-1 flex items-center">
            <img
              src="/hero-image.jpg"
              alt=""
              className="w-full h-full rounded-lg object-cover"
              style={{ height: "300px" }} // Set a fixed height
            />
          </div>
          <div className="w-full flex flex-col justify-between  flex-1">
            <div className="space-y-3">
              <h1 className="text-xl font-bold text-customGreen">Who we Are</h1>
              <p className="text-gray-500 mt-2">
                Jutsa is a student association that brings together IT students
                from Jamhuuriya University of Science and Technology. We are
                dedicated to fostering a community of collaboration and growth
                in the field of technology.
              </p>
              <h1 className="text-xl font-bold text-customGreen">What we do</h1>
              <p className="text-gray-500 mt-2">
                We organize events, workshops, and competitions to help students
                develop their skills and connect with industry professionals.
                Our goal is to provide a platform for students to learn, grow,
                and succeed in the tech industry.
              </p>
              <Link
                to="/about"
                type="button"
                className="group flex  pt-5 items-center transition ease-in-out  text-customGreen"
              >
                Learn More
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
