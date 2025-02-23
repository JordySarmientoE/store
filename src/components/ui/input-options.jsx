import { Card, Input, List, ListItem, Typography } from '@material-tailwind/react';
import { Field } from 'formik';
import React, { useEffect, useRef, useState } from 'react'

const InputOptionForm = ({ touched, errors, listOptions, optionalError, name,
  setFieldValue, findOptions, selectOption, cleanOption }) => {
  const listRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target) &&
        event.target.id !== name
      ) {
        cleanOption();
      }
    };
    

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    selectOption(null);
    if (!searchTerm) return;

    const delaySearch = setTimeout(async () => {
      await findOptions(searchTerm);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  return (
    <>
      <div className="flex flex-col gap-6">
        <Typography
          variant="small"
          color="blue-gray"
          className="-mb-3 font-medium"
          as="label"
          htmlFor={name}
        >
          Nombre
        </Typography>
        <Field
          as={Input}
          name={name}
          id={name}
          size="lg"
          placeholder="Tiendita"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900 -mt-2"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          onChange={(e) => {
            const value = e.target.value;
            setFieldValue(name, value);
            setSearchTerm(value);
          }}
          autoComplete="off"
        />
        {touched && errors && (
          <Typography
            variant="small"
            color="red"
            className="text-xs font-medium"
            style={{ marginTop: '-20px' }}
          >
            {errors}
          </Typography>
        )}
        {touched && optionalError?.visible && (
          <Typography
            variant="small"
            color="red"
            className="text-xs font-medium"
            style={{ marginTop: '-20px' }}
          >
            {optionalError?.message}
          </Typography>
        )}
      </div>
      {listOptions.length > 0 && (
        <Card ref={listRef} className="absolute w-full mt-2 shadow-lg">
          <List>
            {listOptions.map((option) => (
              <ListItem
                key={option?.id}
                className="cursor-pointer"
                onClick={() => {
                  setFieldValue(name, option[name]);
                  selectOption(option);
                }}
              >
                {option[name]}
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    </>
  )
}

export default InputOptionForm;
