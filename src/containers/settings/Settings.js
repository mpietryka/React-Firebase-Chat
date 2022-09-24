import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBarItem, Semibold, Btn } from "../../components";
import { logout } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import { Update } from "../../actions/update";
import { Textfield } from "../textfield/Textfield";
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

export const Settings = () => {
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
  }, []);

  const handleSubmit = (values) => {
    //var users = JSON.parse(localStorage.getItem("users"));
    const tempUsers = users.map((obj) => {
      if (obj.username === user.username) {
        return {
          ...obj,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        };
      }
      return obj;
    });

    const updateDetails = async () => {
      await updateDoc(userRef, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      });
    };
    updateDetails();

    /*     //LOCALSTORAGE 
    //users = tempUsers;
    //localStorage.setItem("users", JSON.stringify(users)); 
    */

    //update Redux store
    const currentUser = tempUsers.find(
      (item) => item.username === user.username
    );
    dispatch(Update(currentUser));
    swal("All done", "Your details were updated", "success");
    navigate("/dashboard");
  };

  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Please enter your first name"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Please enter your last name"),
    email: Yup.string().email("This is not a valid email address"),
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
      <div className="drawer-mobile drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-base-100">
          <NavBar title="Settings" />
          {/* main content */}
          {/* settings navigation */}
          <div className="flex w-full flex-col items-center bg-base-100 lg:flex-row lg:justify-between">
            <NavBarItem className="text-blue-500">
              <Link to="/settings">Update profile</Link>
            </NavBarItem>
            <NavBarItem>
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
          {/* Update details form */}
          <div className="card mx-auto mt-0 w-3/4 border border-gray-200 bg-base-100 p-4 shadow-xl md:mt-5 lg:w-1/2">
            <Formik
              initialValues={{
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Form>
                <Textfield label="First Name" name="firstName" type="text" />
                <Textfield label="Last Name" name="lastName" type="text" />
                <Textfield label="Email" name="email" type="email" />

                <Btn type="submit">
                  <Semibold>Submit</Semibold>
                </Btn>
              </Form>
            </Formik>
          </div>
        </div>
        <DrawerContent />
      </div>
    </>
  );
};
