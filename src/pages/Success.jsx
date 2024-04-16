import React from "react";

const Success = () => {
  return (
    <div className="h-screen grid place-items-center">
      <div className="max-w-sm w-full border rounded-md shadow-md flex justify-center items-center flex-col p-8">
        <div className="mb-8 text-green-500 text-8xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <p className="text-lg w-full text-center">
          Thanks for your order, we'll start working immediately to deliver ASAP
        </p>
      </div>
    </div>
  );
};

export default Success;
