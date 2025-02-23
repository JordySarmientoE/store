import React from 'react';
import {
  Button,
  Dialog,
  Typography,
  Input,
  Card,
  CardBody,
} from '@material-tailwind/react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .optional('La contraseña es opcional')
    .min(5, 'La contraseña debe tener al menos 5 caracteres'),
  name: Yup.string().required('El nombre es obligatorio'),
  lastname: Yup.string().required('El apellido es obligatorio'),
  phone: Yup.string()
    .required('El número de teléfono es obligatorio')
    .matches(
      /^[0-9]{9}$/,
      'El número de teléfono debe tener exactamente 9 dígitos'
    ),
});

function EditUserDialog({ editUser, setEditUser, updateUser }) {
  const handleOpen = () => {
    setEditUser(null);
  };

  const handleEdit = (body) => {
    const newUser = Object.assign({ ...editUser }, body);
    updateUser(newUser);
  };

  return (
    <>
      <Dialog
        size="xs"
        open={!!editUser}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col">
            <Typography className="text-center font-bold">
              Editar Usuario
            </Typography>
            <Formik
              initialValues={{
                name: editUser?.name,
                lastname: editUser?.lastname,
                email: editUser?.email,
                password: editUser?.password || '',
                phone: editUser?.phone,
              }}
              validationSchema={validationSchema}
              onSubmit={handleEdit}
              className="flex w-full"
            >
              {({ touched, errors }) => (
                <Form className="mt-4 mb-2 mx-auto w-full">
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-medium"
                      as="label"
                      htmlFor="nameEdit"
                    >
                      Nombre
                    </Typography>
                    <Field
                      as={Input}
                      name="name"
                      id="nameEdit"
                      size="lg"
                      placeholder="John"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                    {touched.name && errors.name && (
                      <Typography
                        variant="small"
                        color="red"
                        className="text-xs font-medium"
                        style={{ marginTop: '-20px' }}
                      >
                        {errors.name}
                      </Typography>
                    )}
                  </div>
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-medium"
                      as="label"
                      htmlFor="lastnameEdit"
                    >
                      Apellido
                    </Typography>
                    <Field
                      as={Input}
                      name="lastname"
                      id="lastnameEdit"
                      size="lg"
                      placeholder="Doe"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                    {touched.lastname && errors.lastname && (
                      <Typography
                        variant="small"
                        color="red"
                        className="text-xs font-medium"
                        style={{ marginTop: '-20px' }}
                      >
                        {errors.lastname}
                      </Typography>
                    )}
                  </div>
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-medium"
                      as="label"
                      htmlFor="phoneEdit"
                    >
                      Telefono
                    </Typography>
                    <Field
                      name="phone"
                    >
                      {({ field, form }) => (
                        <Input
                          {...field}
                          type="tel"
                          id="phoneEdit"
                          maxLength="9"
                          size="lg"
                          placeholder="123456789"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            form.setFieldValue(field.name, value);
                          }}
                        />
                      )}
                    </Field>
                    {touched.phone && errors.phone && (
                      <Typography
                        variant="small"
                        color="red"
                        className="text-xs font-medium"
                        style={{ marginTop: '-20px' }}
                      >
                        {errors.phone}
                      </Typography>
                    )}
                  </div>
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-medium"
                      as="label"
                      htmlFor="emailEdit"
                    >
                      Correo
                    </Typography>
                    <Field
                      as={Input}
                      name="email"
                      id="emailEdit"
                      size="lg"
                      placeholder="example@gmail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      autoComplete="email"
                    />
                    {touched.email && errors.email && (
                      <Typography
                        variant="small"
                        color="red"
                        className="text-xs font-medium"
                        style={{ marginTop: '-20px' }}
                      >
                        {errors.email}
                      </Typography>
                    )}
                  </div>
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-medium"
                      as="label"
                      htmlFor="password"
                    >
                      Contraseña
                    </Typography>
                    <Field
                      as={Input}
                      type="password"
                      name="password"
                      id="password"
                      size="lg"
                      placeholder="********"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      autoComplete="current-password"
                    />
                    {touched.password && errors.password && (
                      <Typography
                        variant="small"
                        color="red"
                        className="text-xs font-medium"
                        style={{ marginTop: '-20px' }}
                      >
                        {errors.password}
                      </Typography>
                    )}
                  </div>
                  <div className="w-full flex gap-6">
                    <Button
                      className="mt-6 w-1/2 flex justify-center"
                      type="submit"
                      color="blue"
                      variant="gradient"
                    >
                      Editar
                    </Button>
                    <Button
                      className="mt-6 w-1/2 flex justify-center"
                      color="gray"
                      variant="gradient"
                      onClick={() => handleOpen()}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}

export default EditUserDialog;
