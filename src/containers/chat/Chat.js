import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heading, ShadowBox, Centered } from "../../components";

export const Chat = () => {
  const user = useSelector((state) => state.user);

  return (
    <Centered>
      <div className="w-11/12 md:w-3/4 mx-auto">
        <Heading>Welcome Back {user.username}!</Heading>
        <ShadowBox>
          <div className="grid md:grid-cols-5 gap-3">
            <div className="mb-4 min-h-full flex flex-row justify-left border-b-2 md:flex-col md:justify-start md:border-b-0 md:border-r-2 border-gray-200 ">
              <div className="mx-4 md:mx-0 md:mb-4">
                <Link
                  to="/dashboard"
                  className="text-blue-500 font-bold opacity-90 hover:opacity-100 transition-opacity"
                >
                  Home
                </Link>
              </div>
              <div className="mx-4 md:mx-0 md:mb-4">
                <Link
                  to="/updateProfile"
                  className="text-blue-500 font-bold opacity-90 hover:opacity-100 transition-opacity"
                >
                  Update Profile
                </Link>
              </div>
              <div className="mx-4 md:mx-0 md:mb-4">
                <Link
                  to="/chat"
                  className="text-blue-500 font-bold opacity-90 hover:opacity-100 transition-opacity"
                >
                  Chat
                </Link>
              </div>
            </div>
            <div className="md:col-span-4">
              <p className="text-base md:text-xl font-normal text-center">
                Chat here
              </p>
            </div>
          </div>
        </ShadowBox>
      </div>
    </Centered>
  );
};
