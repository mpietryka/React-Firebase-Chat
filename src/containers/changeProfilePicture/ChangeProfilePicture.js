import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Heading,
  ShadowBox,
  Centered,
  Avatar,
  NavigationBar,
  NavBarItem,
} from "../../components";
import { logout } from "../../features/userSlice";
import { Update } from "../../actions/update";
import avatar from "../dashboard/generic-avatar-1.png";
import swal from "sweetalert";

export const UpdateProfilePicture = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const currentUser = JSON.parse(
      localStorage.getItem(JSON.stringify(user.username))
    );
    if (!image) {
      swal("You have not uploaded anything", "Select a file and try again", "warning");
    } else {
      currentUser.profilePicture = image;
      localStorage.setItem(
        JSON.stringify(currentUser.username),
        JSON.stringify(currentUser)
      );
      dispatch(Update(currentUser));
      swal("All done", "Your profile picture was updated", "success");
      navigate("/dashboard");
    }
  };

  return (
    <Centered>
      <div className="w-11/12 md:w-3/4 mx-auto">
        <Heading>Update Profile Picture</Heading>
        <ShadowBox>
          <div className="md:h-[60vh] grid md:grid-cols-5 gap-3">
            <NavigationBar>
              <NavBarItem>
                <Link to="/dashboard" className="text-blue-500">
                  Home
                </Link>
              </NavBarItem>
              <NavBarItem>
                <Link to="/settings" className="text-blue-500">
                  Settings
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
            <div className="mx-auto md:col-span-4">
              <div>
                {!user.profilePicture && !image ? (
                  <Avatar src={avatar} alt="avatar"></Avatar>
                ) : !image ? (
                  <Avatar src={user.profilePicture} alt="profilePic"></Avatar>
                ) : (
                  <Avatar src={image} alt="profilePic"></Avatar>
                )}
                <div>
                  <p className="text-sm text-left w-full mb-4 md:mb-0">
                    Choose your new profile picture
                  </p>
                  <input
                    type="file"
                    className="inline-block opacity-90 hover:opacity-100 transition-opacity file:py-3 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:cursor-pointer"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageChange}
                  />
                  <button
                    className="text-center px-4 py-3 bg-green-500 rounded-md opacity-90 hover:opacity-100 transition-opacity text-white"
                    onClick={handleSubmit}
                  >
                    Change picture
                  </button>
                </div>
                <div className="mx-auto"></div>
              </div>
            </div>
          </div>
        </ShadowBox>
      </div>
    </Centered>
  );
};
