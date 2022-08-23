import React from "react";
import { Formik, Form } from "formik";
import { Textfield } from "./Textfield";
import * as Yup from "yup";
import {
  Heading,
  ShadowBox,
  Btn,
  MainContainer,
  Link,
  Centered,
} from "../../components";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
  
export const Login = () => {
  const validate = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  });
 
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
              console.log("onSubmit", values, values.isAuthenticated=true);
              dispatch(
                login({
                  username: values.username,
                  password: values.password,
                  isAuthenticated: true,
                })
              );
            }}
          >
            <Form>
              <Textfield label="Username" name="username" type="text" />
              <Textfield label="Password" name="password" type="password" />
 
              <Btn type="submit">
                <span className="font-semibold">SIGN-IN</span>
              </Btn>
              <p className=" mt-5 flex justify-between font-light">
                Don't have an account?
                <Link>Register</Link>
              </p>
            </Form>
          </Formik>
        </ShadowBox>
      </MainContainer>
    </Centered>
  );
};