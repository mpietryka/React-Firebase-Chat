import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Heading,
  Heading2,
  Btn,
  ShadowBox,
  Grid2cols,
  Centered,
  Avatar,
  Semibold,
} from "../../components";
import { logout } from "../../features/userSlice";
import avatar from "./generic-avatar-1.png";

export const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <Centered>
        <div className="w-3/4 mx-auto mt-8">
          <Heading>Welcome Back {user.username}!</Heading>
          <ShadowBox>
            <Heading2>User Dashboard</Heading2>
            <Grid2cols>
              <div>
                <Avatar src={avatar} alt="avatar"></Avatar>
              </div>
              <div>
                <p className="text-base md:text-xl font-normal text-left">
                  Username:
                  <Semibold> {user?.username}</Semibold>
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
