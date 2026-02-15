import React from "react";
import { FaDesktop } from "react-icons/fa";
import { LuNetwork } from "react-icons/lu";
import { MdOutlineDesignServices } from "react-icons/md";

const Departments = () => {
  return (
    <section className="py-12 md:py-24 bg-gray-100 text-black" id="departments">
      <div className="mx-auto max-w-contain px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl text-customBlue font-bold">
            Participating Departments
          </h2>
          <p className="text-gray-500  text-lg">
            IT-DAY features presentations and demonstrations from various IT
            departments.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white  rounded-lg shadow-md p-6 space-y-4">
            <FaDesktop className="w-8 h-8 text-customGreen" />
            <h3 className="text-xl text-customBlue font-bold">
              Department of Computer Application
            </h3>
            <p className="text-gray-500 ">
              Students from this department showcase their expertise in software
              development, algorithms, and data analysis.
            </p>
          </div>
          <div className="bg-white  rounded-lg shadow-md p-6 space-y-4">
            <LuNetwork className="w-8 h-8 text-customGreen" />
            <h3 className="text-xl font-bold">Department of Network</h3>
            <p className="text-gray-500 ">
              Students from this department demonstrate their skills in network
              administration, security, and infrastructure management.
            </p>
          </div>
          <div className="bg-white  rounded-lg shadow-md p-6 space-y-4">
            <MdOutlineDesignServices className="w-8 h-8 text-customGreen" />
            <h3 className="text-xl text-customBlue font-bold">
              Department of Multimedia
            </h3>
            <p className="text-gray-500 ">
              Students from this department showcase their talents in graphic
              design, animation, and multimedia development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Departments;
