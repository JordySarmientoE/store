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
                  <div className="mb-2 flex flex-col gap-6">
                    <InputForm name="name" placeholder="John" label="Nombre"
                      touched={touched.name} errors={errors.name} />
                  </div>
                  <div className="mb-2 flex flex-col gap-6">
                    <InputForm name="lastname" placeholder="Doe" label="Apellido"
                      touched={touched.lastname} errors={errors.lastname} />
                  </div>
                  <div className="mb-2 flex flex-col gap-6">
                    <InputNumberForm name='phone' label='Teléfono' placeholder='123456789' maxLength='9'
                      touched={touched.phone} errors={errors.phone} />
                  </div>
                  <div className="mb-2 flex flex-col gap-6">
                    <InputForm name="email" placeholder="example@gmail.com" label="Correo"
                      touched={touched.email} errors={errors.email} />
                  </div>
                  <div className="mb-1 flex flex-col gap-6">
                    <InputForm name="password" placeholder="********" label="Contraseña"
                      touched={touched.password} errors={errors.password} type="password" />
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
