import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { IoBasketballOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Hassan Abdikarim Eymoy",
      role: "President",
      description:
        "Leading our initiatives and representing student interests.",
      image: "/president.jpg",
      facebook: "https://www.facebook.com/aim.king.395",
      linkedIn: "https://www.linkedin.com/in/hassan-akariim-1ab7972ba/",

      Website: "#",
    },
    {
      name: "Hafsa Mohamed Abdi",
      role: "Vice President",
      description: "Supporting the president and managing events.",
      image: "vp.jpg",
      facebook: "#",
      linkedIn: "#",
      Website: "#",
    },
    {
      name: "Abdishakur Mohamed",
      role: "Chief Development Officer",
      description:
        "Visionary driving innovation and strategic growth initiatives.",
      image: "/cdo2.jpg",
      facebook: "https://www.facebook.com/",
      linkedIn: "https://www.linkedin.com/in/a-shakour-mohammed-90836725a/",
      Website: "https://abdishakur.reliatrusty.com/",
    },
    {
      name: "Naima Abdirahiim Wehliye",
      role: "Operation Officer",
      description: "Streamlining operations for efficiency and excellence.",
      image: "hop.jpeg",
      facebook: "#",
      linkedIn: "#",
      Website: "#",
    },
    {
      name: "Mohamed Nur Mumin",
      role: "Finance Officer",
      description: "Managing financial strategy and growth.",
      image: "hof.jpg",
      facebook: "#",
      linkedIn: "#",
      Website: "#",
    },
  ];

  return (
    <section className="bg-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <h2 className="font-bold mb-2 text-center text-customGreen">Team</h2>
        <h1 className="text-3xl font-bold mb-2 text-center text-customBlue">
          Meet Our Team
        </h1>
        <p className="mb-8 text-center">
          Get to know the talented individuals who bring JUTSA's vision to life.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index}>
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h2 className="text-base text-customBlue font-semibold mb-1">
                  {member.name}
                </h2>
                <p className="text-sm text-customGreen font-bold mb-2">
                  {member.role}
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  {member.description}
                </p>
                <div className="flex space-x-4">
                  <Link
                    to={member.facebook}
                    className="hover:text-gray-600 text-xl"
                  >
                    <FaFacebook />
                  </Link>
                  <Link
                    to={member.linkedIn}
                    className="hover:text-gray-600 text-xl"
                  >
                    <FaLinkedin />
                  </Link>
                  <Link
                    to={member.Website}
                    className="hover:text-gray-600 text-xl"
                  >
                    <IoBasketballOutline />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
