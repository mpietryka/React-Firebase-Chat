import React from "react";
import { Formik, Form } from "formik";
import { Textfield } from "./Textfield";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  ShadowBox,
  Btn,
  MainContainer,
  Link,
  Centered,
  Semibold,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Login as login } from "../../actions/auth";

export const Login = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const validate = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  });

  const handleSubmit = (values) => {
    dispatch(login(values));
    navigate("/dashboard");
  };

  const dispatch = useDispatch();

  return (
    <Centered>
      <Heading>LOG IN TO YOUR ACCOUNT</Heading>
      <MainContainer>
        <ShadowBox>
          <Formik
            initialValues={{
              username: "",
              password: "",
              isAuthenticated: false,
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              handleSubmit(values);
              console.log("onSubmit", values);
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
                <Link href="">Register</Link>
              </p>
            </Form>
          </Formik>
        </ShadowBox>
      </MainContainer>
    </Centered>
  );
};
