import React from "react";
import { Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import { ErrorMsg } from "../../components";

import "react-datepicker/dist/react-datepicker.css";

export const Datepicker = ({ label, ...props }) => {
  return (
    <Field name="DOB">
      {({ field, meta, form: { setFieldValue } }) => {
        return (
          <div className="mb-5">
            <label htmlFor={field.name} className="font-semibold">
              {label}
            </label>
            <DatePicker
              className={`mt-2 h-5 w-full rounded-md border border-gray-400 px-3 py-5 transition 
             ease-in-out hover:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
               meta.touched &&
               meta.error &&
               "border border-red-500 focus:ring-red-500"
             }`}
              {...field}
              selected={field.value || null}
              onChange={(val) => {
                setFieldValue(field.name, val);
              }}
            />
            <ErrorMessage name={field.name} component={ErrorMsg} />
          </div>
        );
      }}
    </Field>
  );
};
