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
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

export const Settings = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Goodbye!","Your Account had been deleted. We're sad to see you go!", {
          icon: "success",
        });
        localStorage.removeItem(JSON.stringify(user.username));
        dispatch(logout())
        navigate("/")
      } else {
        swal("Phew!","Your Account is safe!");
      }
    });
  }

  return (
    <Centered>
      <div className="w-11/12 md:w-3/4 mx-auto">
        <Heading>Chat</Heading>
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
            <div className="md:col-span-4">
              <NavBarItem>
                <Link to="/updateProfile">Update profile</Link>
              </NavBarItem>
              <NavBarItem>
                <Link to="/updateProfilePicture">Update profile picture</Link>
              </NavBarItem>
              <NavBarItem>
                <Link to="/changePassword"> Change your password </Link>{" "}
              </NavBarItem>
              <NavBarItem>
                <button className="text-red-500" onClick={(e) => handleDelete(e)}>Delete Account</button>
              </NavBarItem>
            </div>
          </div>
        </ShadowBox>
      </div>
    </Centered>
  );
};
