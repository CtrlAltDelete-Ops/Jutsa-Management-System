import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <div>
      <Helmet>
        <title>404 - Jutsa</title>
      </Helmet>
      <div class="grid h-screen place-content-center bg-white px-4">
        <div class="text-center">
          <h1 class="text-9xl font-black text-gray-200">404</h1>

          <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </p>

          <p class="mt-4 text-gray-500">We can't find that page.</p>

          <Link
            to="/"
            class="mt-6 inline-block rounded bg-customGreen px-5 py-3 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
