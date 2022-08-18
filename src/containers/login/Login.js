import React from "react";

export const Login = () => {
  return (
<div>
  <h1 className="text-3xl text-center my-8">Log in to your Account</h1>
      <div className="container my-5 max-w-md mx-auto">
        <div className="px-8 py-6 rounded-md shadow-lg border border-gray-200">
          <label className="block">Username:</label>
          <input
            type="text"
            placeholder="Username"
            class="w-full h-5 px-3 py-5 mt-2 rounded-md border border-gray-400 hover:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
          />
          <label className="block mt-5">Password:</label>
          <input
            type="password"
            placeholder="Password"
            class="w-full h-5 px-3 py-5 mt-2 rounded-md border border-gray-400 hover:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
          />
          <div className=" mt-5 flex justify-between items-center">
            <a
              href="register"
              className="w-1/2 text-center px-4 py-3 bg-blue-500 rounded-md opacity-90 hover:opacity-100 transition-opacity text-white "
            >
              Sign-in
            </a>
          </div>
          <p className=" mt-5 flex justify-between font-light">
            Don't have an account?
            <a
              href="register"
              className=" text-blue-500 font-bold opacity-90 hover:opacity-100 transition-opacity"
            >
              Register
            </a>
          </p>
        </div>
      </div>
      </div>
  );
};
