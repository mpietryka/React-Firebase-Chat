/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBarItem, Avatar, Btn, Semibold } from "../../components";
import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import avatar from "../dashboard/generic-avatar-1.png";
import { Update } from "../../actions/update";
import { NavBar } from "../navBar/Navbar";
import { DrawerContent } from "../drawerContent/DrawerContent";
import {
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../firebase-config";

export const UpdateProfilePicture = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const userRef = doc(db, "users", user.username);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

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
    if (!image) {
      swal(
        "You have not uploaded anything",
        "Select a file and try again",
        "warning"
      );
    } else {
      const tempUsers = users.map((obj) => {
        if (obj.username === user.username) {
          return { ...obj, profilePicture: image };
        }
        return obj;
      });

      const updatePic = async () => {
        await updateDoc(userRef, { profilePicture: image });
      };

      updatePic();

      const currentUser = tempUsers.find(
        (item) => item.username === user.username
      );

      dispatch(Update(currentUser));
      swal("All done", "Your profile picture was updated", "success");
      navigate("/dashboard");
    }
  };

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(
          "Goodbye!",
          "Your Account had been deleted. We're sad to see you go!",
          {
            icon: "success",
          }
        );

        deleteDoc(doc(db, "users", user.username));
        dispatch(logout());
        navigate("/");
      } else {
        swal("Phew!", "Your Account is safe!");
      }
    });
  };

  return (
    <>
      {/* Drawer */}
      <div className="drawer-mobile drawer h-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-base-100">
          <NavBar title="Settings" />
          {/* main content */}
          {/* settings navigation */}
          <div className="flex w-full flex-col items-center bg-base-100 lg:flex-row lg:justify-between">
            <NavBarItem>
              <Link to="/settings">Update profile</Link>
            </NavBarItem>
            <NavBarItem className="text-blue-500">
              <Link to="/updateProfilePicture">Update profile picture</Link>
            </NavBarItem>
            <NavBarItem>
              <Link to="/changePassword"> Change your password </Link>
            </NavBarItem>
            <NavBarItem>
              <button className="text-red-500" onClick={(e) => handleDelete(e)}>
                Delete Account
              </button>
            </NavBarItem>
          </div>
          {/* Update Picture form */}
          <div className="card mx-auto mt-0 w-3/4 border border-gray-200 bg-base-100 px-4 pb-4 shadow-xl md:mt-5 lg:w-1/2">
            <figure className="py-5 md:px-10 md:py-10">
              {!user.profilePicture && !image ? (
                <Avatar src={avatar} alt="avatar"></Avatar>
              ) : !image ? (
                <Avatar src={user.profilePicture} alt="profilePic"></Avatar>
              ) : (
                <Avatar src={image} alt="profilePic"></Avatar>
              )}
            </figure>
            <div>
              <input
                id="file"
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
              />
              <div className="mx-auto w-3/4">
                <div className="mb-3 text-white ">
                  <label
                    className="mt-2 flex w-full cursor-pointer flex-row justify-center rounded-xl bg-blue-500 px-4 py-3 text-center text-white opacity-90 transition-opacity hover:opacity-100"
                    htmlFor="file"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="block h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <span className="ml-1">Choose a photo</span>
                  </label>
                </div>
                <Btn className="bg-green-500" onClick={handleSubmit}>
                  <Semibold>Submit</Semibold>
                </Btn>
              </div>
            </div>
          </div>
        </div>
        <DrawerContent sett="bordered" />
      </div>
    </>
  );
};
