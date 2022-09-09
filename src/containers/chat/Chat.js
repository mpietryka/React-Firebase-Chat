import React from "react";
//import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Heading,
  ShadowBox,
  Centered,
  NavigationBar,
  NavBarItem,
} from "../../components";
import { logout } from "../../features/userSlice";
import { useDispatch } from "react-redux";

export const Chat = () => {
  //const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <Centered>
      <div className="w-11/12 md:w-3/4 mx-auto">
        <Heading>Chat</Heading>
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
