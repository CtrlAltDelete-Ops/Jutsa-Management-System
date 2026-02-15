import { ActivityIcon } from "lucide-react";
import { CgSupport } from "react-icons/cg";
import { MdDeveloperMode } from "react-icons/md";

const ServiceSection = () => {
  const services = [
    {
      title: "Academic Support",
      description:
        "Our dedicated team of academic advisors is here to help you succeed in your studies. Whether you need assistance with a specific subject or guidance on study skills, we've got you covered.",
      icon: (
        <CgSupport
          className="text-customBlue bg-green-200 rounded-full p-2"
          size={45}
          name="Academic Support"
        />
      ),
    },
    {
      title: "Extracurricular Activities",
      description:
        "Engage in a wide variety of clubs, organizations, and activities, from cultural and social to sports teams. It's a great way to make new friends, develop new skills, and enhance your overall university experience.",
      icon: (
        <ActivityIcon
          className="text-customBlue bg-green-200 rounded-full p-2"
          size={45}
          name="Extracurricular Activities"
        />
      ),
    },
    {
      title: "Career Development",
      description:
        "We offer comprehensive career services and resources to help you prepare for the job market. From resume writing to interview skills, we'll equip you with the tools you need to succeed in your future career.",
      icon: (
        <MdDeveloperMode
          className="text-customBlue bg-green-200 rounded-full p-2"
          size={45}
          name="Career Development"
        />
      ),
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-16 ">
      <div className="text-center items-center mb-7">
        <h2 className="font-semibold mb-2 text-customGreen">Activities</h2>
        <h1 className="text-3xl font-bold mb-2 text-customBlue">
          Activities and Resources We Offer
        </h1>
        <p className="text-center max-w-3xl mx-auto">
          Discover the wide range of activities and resources we offer to help
          you succeed in your academic and personal life.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

function ServiceCard({ title, description, icon }) {
  return (
    <div className="rounded p-4 ">
      <div className="space-y-4">
        {icon}

        <div className="">
          <h1 className="text-xl text-customBlue font-semibold mb-1">
            {title}
          </h1>
          <p className="text-gray-700 text-sm my-4">{description}</p>
        </div>
      </div>
    </div>
  );
}
export default ServiceSection;
