import React from "react";

const Loader = ({ h, w,color }) => {
  return (
       
      <div
        className={`inline-block h-${h} w-${w} animate-spin rounded-full border-4 border-solid 
        border-current border-r-transparent align-[-0.125em] ${color} 
        motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 
          ![clip:rect(0,0,0,0)]"
        >
          Loading...
        </span>
      </div>
  );
};

export default Loader;
