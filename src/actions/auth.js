import { login } from "../features/userSlice";

export const Login = (values) => (dispatch) => {
  try {
    dispatch(
      login({
        username: values.username,
        password: values.password,
        isAuthenticated: true,
      })
    );
  } catch (error) {
    console.error(error);
  }
};
