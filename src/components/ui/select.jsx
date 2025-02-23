import { Option, Select, Typography } from '@material-tailwind/react';
import { Field } from 'formik';
import React from 'react'

const SelectForm = ({ name, label, selectValues = [] }) => {
  return (
    <div className="w-full sm:w-[48%] lg:w-auto">
      <Typography
        variant="small"
        color="blue-gray"
        className="font-medium"
        as="label"
        htmlFor={name}
      >
        {label}
      </Typography>
      <Field name={name}>
        {({ field, form }) => (
          <Select
            variant="outlined"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            id={name}
            autoComplete={name}
            value={field.value}
            onChange={(e) => form.setFieldValue(field.name, e)}
          >
            {selectValues.map((value) => (
              <Option value={value.key} key={value.key}>
                {value.label}
              </Option>
            ))}
          </Select>
        )}
      </Field>
    </div>
  )
}

export default SelectForm;