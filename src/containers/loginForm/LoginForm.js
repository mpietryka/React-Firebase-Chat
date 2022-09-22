import React from "react";
import { Formik, Form } from "formik";
import { Textfield } from "../textfield/Textfield";
import swal from "sweetalert";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import {
  Heading,
  FormBox,
  Btn,
  MainContainer,
  Semibold,
} from "../../components";
import { useDispatch } from "react-redux";
import { Login } from "../../actions/auth";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  });

  const handleSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((item) => item.username === values.username);
    if (!user) {
      swal("Oops! the user doesn't exist", "Try again", "error");
    } else if (values.password !== user.password) {
      swal(
        "Oops! You have entered an incorrect password",
        "Try again",
        "error"
      );
    } else {
      dispatch(Login(user));
      navigate("/dashboard");
    }
  };

  return (
<div class="flex items-center h-screen w-full">
      <MainContainer>
      <Heading>LOG IN TO YOUR ACCOUNT</Heading>
        <FormBox>
          <Formik
            initialValues={{
              username: "",
              password: "",
              isAuthenticated: false,
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form>
              <Textfield label="Username" name="username" type="text" />
              <Textfield label="Password" name="password" type="password" />
              <Btn type="submit">
                <Semibold>SIGN-IN</Semibold>
              </Btn>

              <p className=" mt-5 flex justify-between font-light">
                Don't have an account?
                <Link
                  to="/register"
                  className="font-bold text-blue-500 opacity-90 transition-opacity hover:opacity-100"
                >
                  Register
                </Link>
              </p>
            </Form>
          </Formik>
        </FormBox>
      </MainContainer>

    </div>
  );
};
