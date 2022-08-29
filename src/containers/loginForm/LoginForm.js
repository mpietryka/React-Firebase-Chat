import React from "react";
import { Formik, Form } from "formik";
import { Textfield } from "../textfield/Textfield";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import {
  Heading,
  ShadowBox,
  Btn,
  MainContainer,
  Centered,
  Semibold,
} from "../../components";
import { useDispatch, 
  //useSelector 
} from "react-redux";
import { Login } from "../../actions/auth";

export const LoginForm = () => {
  //const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  });

  const handleSubmit = (values) => {
    dispatch(Login(values));
    navigate("/dashboard");
  };

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
                <Link to ="/register" className="text-blue-500 font-bold opacity-90 hover:opacity-100 transition-opacity">Register</Link>
              </p>
            </Form>
          </Formik>
        </ShadowBox>
      </MainContainer>
    </Centered>
  );
};
