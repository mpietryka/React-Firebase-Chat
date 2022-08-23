import React from "react";
import { ErrorMessage, useField } from "formik";
import { ErrorMsg } from "../../components";
export const Textfield = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-5">
      <label htmlFor={field.name} className="font-semibold">
        {label}
      </label>
      <input
        className={`w-full h-5 px-3 py-5 mt-2 rounded-md border border-gray-400 hover:outline-none 
        focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out ${
          meta.touched &&
          meta.error &&
          "border border-red-500 focus:ring-red-500"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage name={field.name} component={ErrorMsg} />
    </div>
  );
};
