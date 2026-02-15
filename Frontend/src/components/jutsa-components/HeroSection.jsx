import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import AvatarCircles from "../ui/avatar-circles";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import DotPattern from "../ui/dot-pattern";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  // Avatar data with unique entries
  const avatars = [
    {
      imageUrl: "/hop.jpeg",
      profileUrl: "#",
    },
    {
      imageUrl: "/cdo.jpg",
      profileUrl: "https://abdishakur.reliatrusty.com/",
    },
    {
      imageUrl: "hof.jpg",
      profileUrl: "#",
    },
    {
      imageUrl: "vp.jpg",
      profileUrl: "#",
    },

    {
      imageUrl: "president.jpg",
      profileUrl: "#",
    },
    {
      imageUrl: "cdo2.jpg",
      profileUrl: "#",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="max-w-[1200px] md:py-32 pt-24 mx-auto h-full flex flex-col">
        {/* button */}
        <div className="flex items-center justify-center">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 mt-5"
            )}
          >
            <Link to="/about">
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 ">
                <span>✨ Join Our Community</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </Link>
          </div>
        </div>

        {/* Hero Text */}
        <div className="flex flex-col md:text-center text-center sm:text-center md:px-4 px-6 justify-center md:items-center items-start sm:items-center py-6">
          <div className="space-y-2">
            <h1 className="md:text-5xl sm:text-2xl text-[28px] max-w-5xl font-semibold text-customBlue">
              Where Collaboration Builds the Future
            </h1>
            <h1 className="md:text-5xl sm:text-2xl text-[28px] max-w-[800px] font-semibold text-customBlue">
              of Innovation at <span className="text-customGreen">JUTSA</span>
            </h1>
          </div>
          <p className="md:text-xl text-base max-w-2xl pt-2 md:pt-4 text-gray-500">
            At JUTSA, IT students collaborate, innovate, and grow together,
            shaping the future of technology.
          </p>
        </div>

        {/* Avatar Circles */}
        <div>
          <AvatarCircles
            numPeople={7005}
            avatarUrls={avatars}
            className="items-center justify-center"
          />
        </div>

        {/* <div
          className="flex gap-4 items-center justify-center py-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button className="px-6 py-3 rounded-md bg-customBlue text-white font-medium text-base hover:bg-blue-600 transition-colors duration-300">
            Join Us
          </button>
          <button className="px-6 py-3 rounded-md bg-customGreen text-white font-medium text-base hover:bg-green-600 transition-colors duration-300">
            Learn More
          </button>
        </div> */}

        {/* Image Section */}
        <div className="py-10 flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-0 px-4">
            {mounted && (
              <>
                <img
                  src="/hero-5.jpg"
                  alt="Students collaborating"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-[300px] shadow-lg"
                />
                <img
                  src="/hero-2.jpg"
                  alt="Student presentation"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-[300px] shadow-lg"
                />
                <img
                  src="/hero-3.jpg"
                  alt="Campus event"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-[300px] shadow-lg"
                />
                <img
                  src="/hero-4.jpg"
                  alt="Student diversity"
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full h-[300px] shadow-lg"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
