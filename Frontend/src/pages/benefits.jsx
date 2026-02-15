import { MdShowChart } from "react-icons/md";
import { MdConnectWithoutContact } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { GiInspiration } from "react-icons/gi";
import { CgCommunity } from "react-icons/cg";
import { MdExplore } from "react-icons/md";
import { Link } from "react-router-dom";

const Benefits = () => {
  return (
    <section class="bg-white text-black">
      <div class="mx-auto max-w-contain px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div class="mx-auto max-w-[850px] text-center">
          <h2 class="text-2xl font-semibold sm:text-4xl">
            Unlock Opportunities by Showcasing Your Skills at IT-DAY!
          </h2>

          <p class="mt-4 text-gray-500">
            Showcasing your skills at IT-DAY offers many benefits. Present your
            projects to classmates, teachers, industry experts, and fellow
            students. Gain feedback, recognition, and network with
            professionals. Collaborate with peers, explore career paths, and get
            inspired. Don’t miss this chance to shine at IT-DAY!
          </p>
        </div>

        <div class="mt-8 grid grid-cols-1  gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            class="flex flex-col text-center items-center rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-customGreen hover:shadow-green-100"
            href="#"
          >
            <MdShowChart className="text-customGreen text-5xl text-center items-center" />

            <h2 class="mt-4 text-xl font-bold text-black">Show Your Talent</h2>

            <p class="mt-1 text-sm text-gray-500">
              Display your projects to classmates, teachers, and industry
              experts.
            </p>
          </div>
          <div
            class="flex flex-col text-center items-center rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-customGreen hover:shadow-green-100"
            href="#"
          >
            <MdConnectWithoutContact className="text-customGreen text-5xl text-center items-center" />

            <h2 class="mt-4 text-xl font-bold text-black">Build Connections</h2>

            <p class="mt-1 text-sm text-gray-500">
              Meet professionals who can help with future job opportunities.
            </p>
          </div>
          <div
            class="flex flex-col text-center items-center rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-customGreen hover:shadow-green-100"
            href="#"
          >
            <VscFeedback className="text-customGreen text-5xl text-center items-center" />

            <h2 class="mt-4 text-xl font-bold text-black">Receive Feedback</h2>

            <p class="mt-1 text-sm text-gray-500">
              Get valuable advice on how to improve your projects..
            </p>
          </div>
          <div
            class="flex flex-col text-center items-center rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-customGreen hover:shadow-green-100"
            href="#"
          >
            <CgCommunity className="text-customGreen text-5xl text-center items-center" />

            <h2 class="mt-4 text-xl font-bold text-black">
              Improve Communication
            </h2>

            <p class="mt-1 text-sm text-gray-500">
              Practice explaining your projects to a diverse audience.
            </p>
          </div>
          <div
            class="flex flex-col text-center items-center rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-customGreen hover:shadow-green-100"
            href="#"
          >
            <MdExplore className="text-customGreen text-5xl text-center items-center" />

            <h2 class="mt-4 text-xl font-bold text-black">Explore Careers</h2>

            <p class="mt-1 text-sm text-gray-500">
              Discover different career paths in technology.
            </p>
          </div>
          <div
            class="flex flex-col text-center items-center rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-customGreen hover:shadow-green-100"
            href="#"
          >
            <GiInspiration className="text-customGreen text-5xl text-center items-center" />

            <h2 class="mt-4 text-xl font-bold text-black">Get Inspired</h2>

            <p class="mt-1 text-sm text-gray-500">
              See innovative projects from other students and gain new ideas.
            </p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <Link
            to="/register"
            class="inline-block rounded bg-customBlue px-10 py-4 text-sm font-medium text-white transition"
          >
            Join Us Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
