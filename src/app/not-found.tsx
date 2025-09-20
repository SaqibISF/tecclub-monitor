import React, { FC } from "react";

const NotFound: FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center">
    <h1 className="text-7xl font-black mb-4 text-danger-500">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
    <p className="mb-6 text-foreground-500">
      Sorry, the page you are looking for does not exist.
    </p>
  </div>
);

export default NotFound;
