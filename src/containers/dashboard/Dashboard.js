import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Heading,
  ShadowBox,
  Centered,
  Avatar,
  Semibold,
  Grid2cols,
  NavigationBar,
  NavBarItem,
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
        <Heading>Home</Heading>
        <ShadowBox>
          <div className="grid md:grid-cols-5 gap-3">
            <NavigationBar>
              <NavBarItem>
                <Link to="/dashboard" className="text-blue-500">
                  Home
                </Link>
              </NavBarItem>
              <NavBarItem>
                <Link to="/updateProfile" className="text-blue-500">
                  Update Profile
                </Link>
              </NavBarItem>
              <NavBarItem>
                <Link to="/chat" className="text-blue-500">
                  Chat
                </Link>
              </NavBarItem>
              <NavBarItem>
                <button onClick={(e) => handleLogout(e)}>Log out</button>
              </NavBarItem>
            </NavigationBar>
            <div className="md:col-span-4">
              <Grid2cols>
                <div>
                  <Avatar src={avatar} alt="avatar"></Avatar>
                </div>
                <div className="text-left">
                  <p className="py-1 text-sm md:text-base">
                    Username:
                    <Semibold> {user?.username}</Semibold>
                  </p>
                  <p className="py-1 text-sm md:text-base">
                    First name:
                    <Semibold> {user?.firstName}</Semibold>
                  </p>
                  <p className="py-1 text-sm md:text-base">
                    Last name:
                    <Semibold> {user?.lastName}</Semibold>
                  </p>
                  <p className="py-1 text-sm md:text-base">
                    Email:
                    <Semibold> {user?.email}</Semibold>
                  </p>
                </div>
              </Grid2cols>
            </div>
          </div>
        </ShadowBox>
      </div>
    </Centered>
  );
};
