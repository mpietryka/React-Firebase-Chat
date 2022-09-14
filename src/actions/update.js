import { update } from "../features/userSlice";

export const Update = (values) => (dispatch) => {
  try {
    dispatch(
      update({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        profilePicture: values.profilePicture,
      })
    );
  } catch (error) {
    console.error(error);
  }
};
