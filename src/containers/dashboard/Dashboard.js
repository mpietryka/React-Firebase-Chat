import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Heading,
  Heading2,
  Btn,
  ShadowBox,
  Grid2cols,
  Centered,
  Avatar,
} from "../../components";
import { logout, selectUser } from "../../features/userSlice";
import avatar from "./generic-avatar-1.png";

export const Dashboard = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <Centered>
      <div className="w-3/4 mx-auto mt-8">
        <Heading>
          Welcome Back <span>{user.username}</span> !
        </Heading>
        <ShadowBox>
          <Heading2>User Dashboard</Heading2>
          <Grid2cols>
            <div>
              <Avatar
                src={avatar}
                alt="avatar"
                className="mx-auto rounded-full object-scale-down"
              ></Avatar>
            </div>
            <div>
              <p className="text-base md:text-xl font-normal text-left">
                Username:
                <span className="font-semibold"> {user.username}</span>
              </p>
            </div>
          </Grid2cols>
          <div className="md:w-1/4 mx-auto mt-8">
            <Btn onClick={(e) => handleLogout(e)}>Log Out</Btn>
          </div>
        </ShadowBox>
      </div>
    </Centered>
  );
};
