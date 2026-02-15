import React from "react";

const CallToAction = () => {
  return (
    <section className="flex flex-col justify-center text-center items-center space-y-6 bg-white h-[450px]">
      <div className="flex flex-col w-full space-y-3">
        <h1 className="text-2xl font-black md:text-3xl">
          Join our vibrant student association
        </h1>
        <p className="text-sm md:text-base">
          Discover exciting events and opportunities for students in the field
          of computer science and IT.
        </p>
      </div>
      <div className="flex flex-row space-x-3">
        <button className="h-10 px-6 text-base text-white capitalize bg-black">
          Join
        </button>
        <button className="h-10 px-6 text-base capitalize border border-solid">
          Learn more
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
