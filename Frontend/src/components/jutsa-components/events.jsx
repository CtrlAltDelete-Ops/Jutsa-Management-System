import { ActivityIcon } from "lucide-react";
import { CgSupport } from "react-icons/cg";
import { GiBallGlow } from "react-icons/gi";
import { MdDeveloperMode } from "react-icons/md";

const EventsSection = () => {
  const Events = [
    {
      title: "IT Day",
      description:
        "IT Day is a special event where Computer Science students showcase their projects and innovations. It’s a day of inspiration and opportunity.",
      icon: (
        <CgSupport
          className="text-customBlue rounded-md p-2"
          size={45}
          name="Academic Support"
        />
      ),
    },
    {
      title: "Sports Tournament",
      description:
        "Sports Tournament is a yearly tournament that brings together students from different disciplines to compete in various sports.",
      icon: (
        <GiBallGlow
          className="text-customBlue rounded-md p-2"
          size={45}
          name="Extracurricular Activities"
        />
      ),
    },
    {
      title: "Innovators Dialogue",
      description:
        "A platform exclusively for IT students to voice their thoughts, pitch innovative ideas, and collaborate on impactful projects.",
      icon: (
        <MdDeveloperMode
          className="text-customBlue rounded-md p-2"
          size={45}
          name="Career Development"
        />
      ),
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-16 ">
      <div className="text-center items-center mb-7">
        <h2 className="font-semibold mb-2 text-customGreen">Events</h2>
        <h1 className="text-3xl font-bold mb-2 text-customBlue">
          Events for the Semester
        </h1>
        <p className="text-center max-w-3xl mx-auto">
          Discover the wide range of activities and resources we offer to help
          you succeed in your academic and personal life.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Events.map((service, index) => (
          <Event key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

function Event({ title, description, icon }) {
  return (
    <div className="rounded-md p-4 border border-gray-200 bg-customDark">
      <div className="space-y-4">
        {icon}

        <div className="">
          <h1 className="text-xl text-customGreen font-semibold mb-1">
            {title}
          </h1>
          <p className="text-black text-sm my-4">{description}</p>
        </div>
      </div>
    </div>
  );
}
export default EventsSection;
