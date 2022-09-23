import React from "react";
import { Formik, Form } from "formik";
import { Textfield } from "../textfield/Textfield";
import { Datepicker } from "../datepicker/Datepicker";
import * as Yup from "yup";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase-config";
import { useState, useEffect } from "react";
import { getDocs, doc, setDoc, collection } from "firebase/firestore";
import {
  Heading,
  Btn,
  MainContainer,
  Semibold,
  FormBox,
} from "../../components";

export const RegisterForm = () => {
  const navigate = useNavigate();
  //const [found, setfound] = useState();
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

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
    //if array not in localStorage initialise empty array
    //const usersCollectionRef = doc(db, "users", values.username);

    /*     // LOCALSTORAGE VERSION
    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    } */

    /*     //find username in firestore
    const FindByUsername = async () => {
      const docSnap = await getDoc(usersCollectionRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setfound(docSnap.data());
      } else {
        setfound(null);
        console.log("No document with this username");
      }
    };
    FindByUsername(); */

    const findByUsername = users.find(
      (item) => item.username === values.username
    );

    if (findByUsername) {
      swal(
        "Looks like this username is already in use",
        "Try another one",
        "warning"
      );
    } else {
      //new object with formik values
      const newUser = JSON.parse(JSON.stringify(values));
      //add to firestore
      setDoc(doc(db, "users", values.username), newUser);

      /*       //LOCALSTORAGE Version
      users.push(values);
      localStorage.setItem("users", JSON.stringify(users)); 
      */
      navigate("/");
    }
  };

  return (
    <MainContainer>
      <Heading>REGISTER</Heading>
      <FormBox>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            DOB: "",
            email: "",
            password: "",
            confirmPassword: "",
            profilePicture: "",
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
                className="font-bold text-blue-500 opacity-90 transition-opacity hover:opacity-100"
              >
                Log in
              </Link>
            </p>
          </Form>
        </Formik>
      </FormBox>
    </MainContainer>
  );
};
