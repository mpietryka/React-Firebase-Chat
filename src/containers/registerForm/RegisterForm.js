import React from "react";
import { Formik, Form } from "formik";
import { Textfield } from "../textfield/Textfield";
import { Datepicker } from "../datepicker/Datepicker";
import * as Yup from "yup";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import {
  Heading,
  ShadowBox,
  Btn,
  MainContainer,
  Centered,
  Semibold,
} from "../../components";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Please enter your first name"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Please enter your last name"),
    username: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Please enter your username"),
    email: Yup.string()
      .email("This is not a valid email address")
      .required("Please enter your email address"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Please enter your password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    DOB: Yup.date()
      .required("Please enter your date of birth")
      .test("age", "You must be 18 or older", function (birthdate) {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);
        return birthdate <= cutoff;
      }),
  });
  const handleSubmit = (values) => {
    const username = values.username;
    if (localStorage.getItem(JSON.stringify(username))) {
      swal(
        "Looks like this username is already in use",
        "Try another one",
        "warning"
      );
    } else {
      localStorage.setItem(JSON.stringify(username), JSON.stringify(values));
      console.log("onSubmit", values);
      navigate("/");
    }
  };

  return (
    <Centered>
      <Heading>REGISTER</Heading>
      <MainContainer>
        <ShadowBox>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              DOB: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form>
              <Textfield label="First Name" name="firstName" type="text" />
              <Textfield label="Last Name" name="lastName" type="text" />
              <Textfield label="Username" name="username" type="text" />
              <Datepicker label="Date of Birth" name="DOB" type="date" />
              <Textfield label="Email" name="email" type="email" />
              <Textfield label="Password" name="password" type="password" />
              <Textfield
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <Btn type="submit">
                <Semibold>REGISTER</Semibold>
              </Btn>
              <p className=" mt-5 flex justify-between font-light">
                Already have an account?
                <Link
                  to="/"
                  className="text-blue-500 font-bold opacity-90 hover:opacity-100 transition-opacity"
                >
                  Log in
                </Link>
              </p>
            </Form>
          </Formik>
        </ShadowBox>
      </MainContainer>
    </Centered>
  );
};
