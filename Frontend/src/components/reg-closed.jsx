import React from "react";
import { Link } from "react-router-dom";

const RegClosed = () => {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center  px-4 py-12 ">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-customBlue p-6 shadow-lg ">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter text-white ">
            Registration is Closed
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            We're sorry, but the registration for this event has been closed.
            Please check back later for future events.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default RegClosed;
