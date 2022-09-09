import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Heading,
  ShadowBox,
  Centered,
  Semibold,
  Btn,
  NavigationBar,
  NavBarItem,
} from "../../components";
import { Textfield } from "../textfield/Textfield";
import { logout } from "../../features/userSlice";
import { Update } from "../../actions/update";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

export const ChangePassword = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const Currentuser = JSON.parse(
      localStorage.getItem(JSON.stringify(user.username))
    );
    if (values.oldPassword !== Currentuser.password) {
      swal("Ooops!", "This is not your old password try again", "warning");
    } else {
      Currentuser.password = values.password;
      Currentuser.confirmPassword = values.confirmPassword;
      localStorage.setItem(
        JSON.stringify(Currentuser.username),
        JSON.stringify(Currentuser)
      );
      dispatch(Update(Currentuser));
      swal("All done", "Your password is now changed", "success");
      navigate("/dashboard");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
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

  return (
    <Centered>
      <div className="w-11/12 md:w-3/4 mx-auto">
        <Heading>Change your password</Heading>
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
              <div className="w-full md:w-3/4 mx-auto">
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
                    <Textfield
                      label="Password"
                      name="password"
                      type="password"
                    />
                    <Textfield
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                    />
                    <Btn type="submit">
                      <Semibold>Change Password</Semibold>
                    </Btn>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </ShadowBox>
      </div>
    </Centered>
  );
};
