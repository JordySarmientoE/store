import { Input, Typography } from '@material-tailwind/react';
import { Field } from 'formik';
import React from 'react'

const InputForm = ({ name, label, placeholder, touched, errors, type }) => {
  return (
    <div className="w-full lg:w-auto">
      <Typography
        variant="small"
        color="blue-gray"
        className="font-medium"
        as="label"
        htmlFor={name}
      >
        {label}
      </Typography>
      <Field
        as={Input}
        variant="outlined"
        placeholder={placeholder}
        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        name={name}
        id={name}
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
        autoComplete={name}
        type={type}
      />
      {touched && errors && (
        <Typography
          variant="small"
          color="red"
          className="text-xs font-medium"
        >
          {errors}
        </Typography>
      )}
    </div>
  )
}

export default InputForm;