import { Input, Typography } from '@material-tailwind/react';
import { Field } from 'formik';
import React from 'react'

const InputNumberForm = ({ name, label, placeholder, maxLength, touched, errors }) => {
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
        name={name}
      >
        {({ field, form }) => (
          <Input
            {...field}
            type="tel"
            id={name}
            maxLength={maxLength}
            size="lg"
            placeholder={placeholder}
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              form.setFieldValue(field.name, value);
            }}
          />
        )}
      </Field>
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

export default InputNumberForm;