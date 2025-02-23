import { Input, Button, Typography } from '@material-tailwind/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserServices } from '@/services';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/authSlice';
import { showToast } from '@/utils/alerts';
import { InputForm, InputNumberForm } from '@/components/ui';

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
        <div className="w-full flex flex-col items-center justify-center">
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
              <Form className="mt-8 mb-3 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                <div className="mb-3 flex flex-col gap-6">
                  <InputForm name="name" placeholder="John" label="Nombre"
                    touched={touched.name} errors={errors.name} />
                </div>
                <div className="mb-3 flex flex-col gap-6">
                  <InputForm name="lastname" placeholder="Doe" label="Apellido"
                    touched={touched.lastname} errors={errors.lastname} />
                </div>
                <div className="mb-3 flex flex-col gap-6">
                  <InputNumberForm name='phone' label='Teléfono' placeholder='123456789' maxLength='9'
                    touched={touched.phone} errors={errors.phone} />
                </div>
                <div className="mb-3 flex flex-col gap-6">
                  <InputForm name="email" placeholder="example@gmail.com" label="Correo"
                    touched={touched.email} errors={errors.email} />
                </div>
                <div className="mb-3 flex flex-col gap-6">
                  <InputForm name="password" placeholder="********" label="Contraseña"
                    touched={touched.password} errors={errors.password} type="password" />
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
