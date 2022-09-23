import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBarItem } from "../../components";
import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Textfield } from "../textfield/Textfield";
import { NavBar } from "../navBar/Navbar";
import { Update } from "../../actions/update";
import { DrawerContent } from "../drawerContent/DrawerContent";
import {
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../firebase-config";

export const ChangePassword = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const userRef = doc(db, "users", user.username);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    console.log(users)
  }, []);

 
  const handleSubmit = (values) => {
    //var users = JSON.parse(localStorage.getItem("users"));
    console.log("all users " + users);
    //const tempUser = users.find((item) => item.username === user.username);
    console.log(values)
    if (values.oldPassword !== user.password) {
      swal("Ooops!", "This is not your old password try again", "warning");
    } else {
       const tempUsers = users.map((obj) => {
        if (obj.username === user.username) {
          return {
            ...obj,
            password: values.password,
            confirmPassword: values.confirmPassword,
          };
        }
        return obj;
      }); 

      //localStorage.setItem("users", JSON.stringify(users));
      const updatePassword = async () => {
        await updateDoc(userRef, {
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
      };

      updatePassword()

      const currentUser = tempUsers.find((item) => item.username === user.username);
      console.log("current user: "+currentUser)
      dispatch(Update(currentUser));
      swal("All done", "Your password is now changed", "success");
      navigate("/dashboard");
    }
  };

  const validate = Yup.object({
    oldPassword: Yup.string().required("Please enter your old password"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Please enter your password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleDelete = () => {
    //var users = JSON.parse(localStorage.getItem("users"));

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
        //filter the users array, leave everything but the user with the user.username

        deleteDoc(doc(db, "users", user.username));
        //users = users.filter((item) => item.username !== user.username);
        //localStorage.setItem("users", JSON.stringify(users));
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
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-base-100">
          <NavBar title="Settings" />
          {/* main content */}
          {/* settings navigation */}
          <div className="flex w-full flex-col items-center bg-base-100 lg:flex-row lg:justify-between">
            <NavBarItem>
              <Link to="/settings">Update profile</Link>
            </NavBarItem>
            <NavBarItem>
              <Link to="/updateProfilePicture">Update profile picture</Link>
            </NavBarItem>
            <NavBarItem className="text-blue-500">
              <Link to="/changePassword"> Change your password </Link>
            </NavBarItem>
            <NavBarItem>
              <button className="text-red-500" onClick={(e) => handleDelete(e)}>
                Delete Account
              </button>
            </NavBarItem>
          </div>
          {/* Update details form */}
          <div className="card mx-auto mt-0 w-3/4 border border-gray-200 bg-base-100 p-4 shadow-xl md:mt-5 lg:w-1/2">
            <Formik
              initialValues={{
                oldPassword: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Form>
                <Textfield
                  label="Old Password"
                  name="oldPassword"
                  type="password"
                />
                <Textfield label="Password" name="password" type="password" />
                <Textfield
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
                <ul className="menu w-full bg-gray-100 text-center text-base-content ">
                  <li className="w-full rounded-xl bg-blue-500 text-white">
                    <button type="submit">
                      <label className="w-full text-center font-semibold">
                        Submit
                      </label>
                    </button>
                  </li>
                </ul>
              </Form>
            </Formik>
          </div>
        </div>
        <DrawerContent />
      </div>
    </>
  );
};
