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
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

export const LoginForm = () => {
  //const [found, setfound] = useState();
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  });

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    
  }, []);
 
  const handleSubmit = (values) => {
/*     // LOCALSTORAGE
    //const users = JSON.parse(localStorage.getItem("users")); */
    const user = users.find((item) => item.username === values.username);
    
    /*     const FindByUsername = async () => {
      //const usersCollectionRef = doc(db, "users", values.username);
      const docSnap = await getDoc(usersCollectionRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setfound(docSnap.data());
      } else {
        //setfound(null);
        console.log("No document with this username");
      }
      setfound(docSnap.data())
    };
    FindByUsername(); */

    console.log(user);

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
    <div className="flex h-screen w-full items-center">
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
