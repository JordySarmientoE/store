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
    .email('Email inválido'),
  name: Yup.string().required('El nombre es obligatorio'),
  address: Yup.string().required('La dirección es obligatorio'),
  ruc: Yup.string()
    .matches(
      /^[0-9]{11}$/,
      'El RUC debe tener exactamente 11 dígitos'
    ),
  phone: Yup.string()
    .matches(
      /^[0-9]{9}$/,
      'El número de teléfono debe tener exactamente 9 dígitos'
    ),
});

function EditStoreDialog({ editStore, setEditStore, updateStore }) {
  const handleOpen = () => {
    setEditStore(null);
  };

  const handleEdit = (body) => {
    const newStore = Object.assign(editStore, body);
    updateStore(newStore);
  };

  return (
    <>
      <Dialog
        size="xs"
        open={!!editStore}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col">
            <Typography className="text-center font-bold">
              Editar Tienda
            </Typography>
            <Formik
              initialValues={{
                name: editStore?.name,
                address: editStore?.address,
                ruc: editStore?.ruc,
                email: editStore?.email || "",
                phone: editStore?.phone,
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
                      htmlFor="name"
                    >
                      Nombre
                    </Typography>
                    <Field
                      as={Input}
                      name="name"
                      id="name"
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
                      htmlFor="address"
                    >
                      Dirección
                    </Typography>
                    <Field
                      as={Input}
                      name="address"
                      id="address"
                      size="lg"
                      placeholder="Av.."
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                    {touched.address && errors.address && (
                      <Typography
                        variant="small"
                        color="red"
                        className="text-xs font-medium"
                        style={{ marginTop: '-20px' }}
                      >
                        {errors.address}
                      </Typography>
                    )}
                  </div>
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-medium"
                      as="label"
                      htmlFor="ruc"
                    >
                      RUC
                    </Typography>
                    <Field
                      as={Input}
                      type="tel"
                      id="ruc"
                      maxLength="11"
                      name="ruc"
                      size="lg"
                      placeholder="96839091211"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                    {touched.ruc && errors.ruc && (
                      <Typography
                        variant="small"
                        color="red"
                        className="text-xs font-medium"
                        style={{ marginTop: '-20px' }}
                      >
                        {errors.ruc}
                      </Typography>
                    )}
                  </div>
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-medium"
                      as="label"
                      htmlFor="phone"
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
                          id="phone"
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
                      htmlFor="email"
                    >
                      Correo
                    </Typography>
                    <Field
                      as={Input}
                      name="email"
                      id="email"
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

export default EditStoreDialog;
