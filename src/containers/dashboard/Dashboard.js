import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { stringify } from "uuid";
import {
  Heading,
  Btn,
  ShadowBox,
  Centered,
  Avatar,
  Semibold,
} from "../../components";
import { logout } from "../../features/userSlice";
import avatar from "./generic-avatar-1.png";

export const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <Centered>
      <div className="w-11/12 md:w-3/4 mx-auto">
        <Heading>Welcome Back {user.username}!</Heading>
        <ShadowBox>
          <div className="grid md:grid-cols-5 gap-3">
            <div className="mb-4 min-h-full flex flex-row justify-left border-b-2 md:flex-col md:justify-start md:border-b-0 md:border-r-2 border-gray-200 ">
              <div className="mx-4 md:mx-0 md:mb-4">
              <Link to="/dashboard" className="text-blue-500 font-bold opacity-90 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </div>
              <div className="mx-4 md:mx-0 md:mb-4">
              <Link to="/updateProfile" className="text-blue-500 font-bold opacity-90 hover:opacity-100 transition-opacity">
                  Update Profile
                </Link>
              </div>
              <div className="mx-4 md:mx-0 md:mb-4">
              <Link to="/chat" className="text-blue-500 font-bold opacity-90 hover:opacity-100 transition-opacity">
                  Chat
                </Link>
              </div>
            </div>
            <div className="md:col-span-4">
              <Avatar src={avatar} alt="avatar"></Avatar>
              <p className="text-base md:text-xl font-normal text-center">
                Username:
                <Semibold> {user?.username}</Semibold>
              </p>
              <p className="text-base md:text-xl font-normal text-center">
                First name:
                <Semibold> {user?.firstName}</Semibold>
              </p>
              <p className="text-base md:text-xl font-normal text-center">
                Last name:
                <Semibold> {user?.lastName}</Semibold>
              </p>
              <p className="text-base md:text-xl font-normal text-center">
                Email:
                <Semibold> {user?.email}</Semibold>
              </p>
              <div className="md:w-1/4 mx-auto mt-8">
              <Btn onClick={(e) => handleLogout(e)}>Log Out</Btn>
            </div>
            </div>


          </div>
        </ShadowBox>
      </div>
    </Centered>
  );
};
