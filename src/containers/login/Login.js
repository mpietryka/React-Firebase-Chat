import React from "react";
import { Formik, Form } from "formik";
import { Textfield } from "./Textfield";
import * as Yup from "yup";

export const Login = () => {
  const validate = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  });

  return (
    <>
      <h1 className=" text-xl md:text-3xl text-center my-8 font-bold">
        LOG IN TO YOUR ACCOUNT
      </h1>
      <div className="container my-5 w-4/5 md:w-2/6 mx-auto">
        <div className="px-8 py-6 rounded-md shadow-lg border border-gray-200">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validate}
          >
            <Form>
              <Textfield label="Username" name="username" type="text" />
              <Textfield label="Password" name="password" type="password" />
              <button
                type="submit"
                className="w-full mt-2 text-center px-4 py-3 bg-blue-500 rounded-md opacity-90 hover:opacity-100 transition-opacity text-white"
              >
                <span className="font-semibold">SIGN-IN</span>
              </button>
              <p className=" mt-5 flex justify-between font-light">
                Don't have an account?
                <a
                  href="register"
                  className=" text-blue-500 font-bold opacity-90 hover:opacity-100 transition-opacity"
                >
                  Register
                </a>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
