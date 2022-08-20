import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Textfield } from "./Textfield";
import * as Yup from "yup";
import { Heading, ShadowBox, Btn, MainContainer, Link } from "../../components";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validate = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({
      username: username,
      password: password,
      isAuthenticated: true,
    }))
  }

  return (
    <div className="h-screen flex flex-col justify-center">
      <Heading>LOG IN TO YOUR ACCOUNT</Heading>
      <MainContainer>
        <ShadowBox>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validate}
          >
            {(formik) => (
              <div>
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Textfield
                    label="Username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Textfield
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Btn type="submit">
                    <span className="font-semibold">SIGN-IN</span>
                  </Btn>
                  <p className=" mt-5 flex justify-between font-light">
                    Don't have an account?
                    <Link>Register</Link>
                  </p>
                </Form>
              </div>
            )}
          </Formik>
        </ShadowBox>
      </MainContainer>
    </div>
  );
};
