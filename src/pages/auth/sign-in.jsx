import { Button, Typography, Input } from '@material-tailwind/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { AuthServices } from '@/services';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '@/redux/authSlice';
import { getRoutesByRole } from '@/routes/routes';
import { showToast } from '@/utils/alerts';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(5, 'La contraseña debe tener al menos 5 caracteres'),
});

export function SignIn() {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    dispatch(logout());
  }, []);

  const handleLogin = async (body) => {
    try {
      const res = await AuthServices.Login(body);
      localStorage.setItem('token', res.token);
      dispatch(login(res));
      const routes = getRoutesByRole(res.role);
      navigator('/dashboard'.concat(routes[0].path));
    } catch (error) {
      showToast('error', error?.message);
    }
  };

  return (
    <section className="min-h-screen flex">
      <div className="flex w-full gap-6 p-4">
        <div className="w-full lg:w-3/5 flex flex-col justify-center">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">
              Iniciar Sesión
            </Typography>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="text-lg font-normal"
            >
              Ingresa tu correo y contraseña
            </Typography>
          </div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ touched, errors }) => (
              <Form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
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
                    variant="outlined"
                    placeholder="example@gmail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="email"
                    id="email"
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
                    size="lg"
                    name="password"
                    id="password"
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
                  Iniciar Sesión
                </Button>
                <Typography
                  variant="paragraph"
                  className="text-center text-blue-gray-500 font-medium mt-4"
                >
                  ¿No se encuentra registrado?
                  <Link to="/sign-up" className="text-gray-900 ml-1">
                    Crear cuenta
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </div>
        <div className="w-2/5 h-full hidden lg:block">
          <img
            src="/img/pattern.png"
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}

export default SignIn;
