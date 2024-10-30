// components/Loader.tsx

import React from "react";

const Loader = () => {
  return (
    <div className="flex z-50 items-center justify-center min-h-screen">
      <div className="w-5 h-5 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
};

export default Loader;