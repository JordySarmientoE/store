import { Input, Button, Typography } from '@material-tailwind/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserServices } from '@/services';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/authSlice';
import { showToast } from '@/utils/alerts';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .required('La contraseña es obligatoria')
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

export function SignUp() {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    dispatch(logout());
  }, []);

  const handleRegister = async (body) => {
    try {
      await UserServices.Register(body);
      showToast('success', 'Se registro usuario correctamente.');
      navigator('/sign-in');
    } catch (error) {
      showToast('error', error?.message);
    }
  };

  return (
    <section className="min-h-screen flex">
      <div className="flex w-full gap-4 p-4">
        <div className="w-2/5 h-full hidden lg:block">
          <img
            src="/img/pattern.png"
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">
              Únete hoy
            </Typography>
          </div>
          <Formik
            initialValues={{
              name: '',
              lastname: '',
              email: '',
              password: '',
              phone: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ touched, errors }) => (
              <Form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
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
                    htmlFor="lastname"
                  >
                    Apellido
                  </Typography>
                  <Field
                    as={Input}
                    name="lastname"
                    id="lastname"
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
                        placeholder="12345678"
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
                <Button className="mt-6" fullWidth type="submit">
                  Registrar ahora
                </Button>

                <Typography
                  variant="paragraph"
                  className="text-center text-blue-gray-500 font-medium mt-4"
                >
                  ¿Ya cuentas con una cuenta?
                  <Link to="/sign-in" className="text-gray-900 ml-1">
                    Iniciar Sesión
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
