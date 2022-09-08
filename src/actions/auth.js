import { login } from "../features/userSlice";

export const Login = (values) => (dispatch) => {
  try {
    dispatch(
      login({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        DOB: values.DOB,
        username: values.username,
        password: values.password,
        isAuthenticated: true,
      })
    );
  } catch (error) {
    console.error(error);
  }
};
