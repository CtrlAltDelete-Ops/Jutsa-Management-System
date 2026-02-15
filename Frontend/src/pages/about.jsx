import { Globe } from "lucide-react";
import { CgArrowRight, CgCode, CgGlobe } from "react-icons/cg";
import { GiVote } from "react-icons/gi";
import { TbInnerShadowTopRight } from "react-icons/tb";

const About = () => {
  const innovations = [
    {
      title: "Management System",
      description:
        "Streamlining administrative tasks for efficient club operations",
      icon: CgCode,
    },
    {
      title: "Election System",
      description:
        "Ensuring fair and transparent leadership selection within our association",
      icon: GiVote,
    },
    {
      title: "Association Website",
      description:
        "A platform showcasing our activities, achievements, and providing resources for members",
      icon: Globe,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-32 space-y-12">
      {/* Our Vision Section */}
      <section className="space-y-4">
        <h2 className="text-customGreen uppercase text-sm font-medium">
          Our Vision
        </h2>
        <h3 className="text-3xl font-bold leading-tight">
          WE&apos;RE PASSIONATE
          <br />
          ABOUT TECHNOLOGY
        </h3>
        <p className="text-sm leading-relaxed">
          Our Tech Student Association at Jamhuriya University is designed to
          foster innovation and collaboration among tech enthusiasts. Our
          friendly community ensures that your learning experience is both
          memorable and impactful. Join us in exploring the latest in
          technology, where every project is a celebration of creativity,
          knowledge, and teamwork. We look forward to sharing our passion for
          technology with you!
        </p>
        <div className="h-64 w-full rounded-lg overflow-hidden mt-6">
          <img
            src="/about-page.jpg"
            alt="Students collaborating on a tech project"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="space-y-4">
        <h2 className="text-customGreen uppercase text-sm font-medium">
          Our Mission
        </h2>
        <h3 className="text-3xl font-bold leading-tight">
          EMPOWERING THROUGH
          <br />
          TECHNOLOGY
        </h3>
        <p className="text-sm leading-relaxed">
          Our mission is to provide Jamhuriya University students with the
          knowledge, skills, and resources needed to excel in the rapidly
          evolving tech industry. We are committed to creating hands-on learning
          experiences, fostering collaboration, and connecting students with
          industry leaders to build a strong foundation for their future
          careers.
        </p>
      </section>

      {/* President's Message */}
      <section className="space-y-4 ">
        <h2 className="text-customGreen uppercase text-sm font-medium">
          President&apos;s Message
        </h2>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <img
            src="/president.jpg"
            alt="President of Tech Student Association"
            width={200}
            height={200}
            className="rounded-lg"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Hassan Abdikariim Aymoy
            </h3>
            <p className="text-sm leading-relaxed">
              &quot;As president of the Tech Student Association at Jamhuriya
              University, I am excited to welcome you to our community of
              innovators and future tech leaders. Our association is more than
              just a club; it&apos;s a launchpad for your tech career. Together,
              we will explore, learn, and create the technologies that will
              shape our future. Join us in this exciting journey of discovery
              and innovation!&quot;
            </p>
          </div>
        </div>
      </section>

      {/* our activities section */}
      {/* <section className="space-y-4">
        <h2 className="text-blue-600 uppercase text-sm font-medium">
          Our Activities
        </h2>
        <h3 className="text-3xl font-bold leading-tight">
          ENGAGE, LEARN, AND GROW
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Sports</h4>
            <p className="text-sm leading-relaxed">
              We organize various tech-themed sports events and e-sports
              tournaments to promote teamwork and healthy competition among our
              members.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">IT Day</h4>
            <p className="text-sm leading-relaxed">
              Our annual IT Day showcases student projects, hosts industry
              speakers, and provides networking opportunities with tech
              companies.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Hackathons</h4>
            <p className="text-sm leading-relaxed">
              Regular hackathons challenge our members to solve real-world
              problems using cutting-edge technologies in a time-constrained
              environment.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Workshops</h4>
            <p className="text-sm leading-relaxed">
              We conduct hands-on workshops on various topics like web
              development, AI, cybersecurity, and more to keep our members
              updated with the latest tech trends.
            </p>
          </div>
        </div>
      </section> */}
      {/* Our Innovations Section }*/}
      <section className="py-16 bg-gradient-to-br ">
        <div className="max-w-6xl mx-auto">
          <div className="text-start mb-5">
            <h2 className="text-customGreen uppercase text-sm font-medium tracking-wider">
              Our Innovations
            </h2>
          </div>

          <div className="flex gap-3 items-center mb-16">
            <div className="w-[700px]">
              <div className="bg-blue-200 rounded-full"></div>
              <img
                src="/cdo.jpg"
                alt="Chief Development Officer"
                width={200}
                height={200}
                className="rounded-full z-10"
              />
            </div>
            <div className="space-y-4">
              <h4 className="text-2xl font-semibold text-gray-800">
                Abdishakur Mohamed Hussein
              </h4>
              <p className="text-customGreen font-medium">
                Chief Development Officer
              </p>
              <blockquote className="text-gray-600 italic border-l-4 border-customGreen pl-4">
                "Innovation is at the heart of everything we do at the Tech
                Student Association. We're not just learning about technology;
                we're actively creating solutions that can make a real
                difference in our university and beyond."
              </blockquote>
            </div>
          </div>

          <div className="w-full grid md:grid-cols-3 gap-8">
            {innovations.map((innovation, index) => (
              <div
                key={index}
                className="bg-white rounded-lg  p-6 transition-all duration-300 "
              >
                <div className="text-customGreen mb-4">
                  {innovation.icon === CgCode ? (
                    <CgCode
                      className="text-customGreen rounded-md p-2"
                      size={45}
                      name="Management System"
                    />
                  ) : innovation.icon === GiVote ? (
                    <GiVote
                      className="text-customGreen rounded-md p-2"
                      size={45}
                      name="Election System"
                    />
                  ) : innovation.icon === Globe ? (
                    <Globe
                      className="text-customGreen rounded-md p-2"
                      size={45}
                      name="Association Website"
                    />
                  ) : null}
                </div>
                <h5 className="text-xl font-semibold mb-2">
                  {innovation.title}
                </h5>
                <p className="text-gray-600 mb-4">{innovation.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center text-customGreen hover:text-customBlue transition-colors group"
                >
                  Learn more{" "}
                  <CgArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
