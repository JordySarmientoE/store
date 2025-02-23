import React from 'react';
import {
  Button,
  Dialog,
  Typography,
  Card,
  CardBody,
} from '@material-tailwind/react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { InputForm, InputNumberForm } from '@/components/ui';

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
                <Form className="mt-4 mb-3 mx-auto w-full">
                  <div className="mb-1 flex flex-col gap-6">
                    <InputForm name="name" placeholder="John" label="Nombre"
                      touched={touched.name} errors={errors.name} />
                  </div>
                  <div className="mb-3 flex flex-col gap-6">
                    <InputForm name="address" placeholder="Av.." label="Dirección"
                      touched={touched.address} errors={errors.address} />
                  </div>
                  <div className="mb-3 flex flex-col gap-6">
                    <InputNumberForm name='ruc' label='RUC' placeholder='96839091211' maxLength='11'
                      touched={touched.ruc} errors={errors.ruc} />
                  </div>
                  <div className="mb-3 flex flex-col gap-6">
                    <InputNumberForm name='phone' label='Teléfono' placeholder='123456789' maxLength='9'
                      touched={touched.phone} errors={errors.phone} />
                  </div>
                  <div className="mb-3 flex flex-col gap-6">
                    <InputForm name="email" placeholder="example@gmail.com" label="Correo"
                      touched={touched.email} errors={errors.email} />
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
