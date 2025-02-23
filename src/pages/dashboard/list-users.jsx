import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  IconButton,
  Input,
  Select,
  Option,
  Button,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { ShopServices, UserServices } from '@/services';
import { toTitleCase } from '@/utils/functions.helper';
import {
  BackwardIcon,
  BuildingStorefrontIcon,
  CheckCircleIcon,
  ForwardIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { showConfirmDialog, showToast } from '@/utils/alerts';
import EditUserDialog from '@/widgets/dialogs/edit-user';
import { Roles } from '@/utils/roles';
import { Field, Form, Formik } from 'formik';
import AssignShop from '@/widgets/dialogs/assign-shop';

export function ListUsers() {
  const [pagination, setPagination] = useState({
    page: 1,
    search: {},
  });
  const [listUsers, setListUsers] = useState({
    total: 0,
    nroPages: 1,
    data: []
  });
  const itemsPerPage = 5;
  const [editUser, setEditUser] = useState(null);
  const [assignShopUser, setAssignShopUser] = useState(null);
  const initialSearch = { name: '', lastname: '', email: '', role: '', status: '', phone: '' };

  const getListOfUsers = async (page) => {
    try {
      const token = localStorage.getItem('token');
      const res = await UserServices.List(token, {
        page,
        rows: itemsPerPage,
        ...pagination.search,
      });
      setListUsers({
        total: res.total,
        nroPages: res.nroPages,
        data: res.data,
      });
    } catch (error) {
      showToast('error', error?.message);
    }
  };

  useEffect(() => {
    getListOfUsers(pagination.page);
  }, [pagination]);

  const handlePageChange = async (page) => {
    setPagination({
      ...pagination,
      page,
    })
  };

  const updateUser = async (user) => {
    try {
      setEditUser(null);
      const usuario = `${toTitleCase(user.name)} ${toTitleCase(user.lastname)}`;
      showConfirmDialog({
        icon: 'warning',
        title: `¿Desea editar el usuario ${usuario}?`,
        onConfirm: async () => {
          try {
            const token = localStorage.getItem('token');
            await UserServices.Edit(token, user.id, user);
            setPagination({
              ...pagination,
              page: pagination.page
            });
            showToast('success', `Se editó el usuario ${usuario}`);
          } catch (error) {
            showToast('error', error?.message);
          }
        },
        onClose: () => {
          setEditUser(user);
        },
      });
    } catch (error) {
      showToast('error', error?.message);
    }
  };

  const deleteUser = async (user) => {
    const usuario = `${toTitleCase(user.name)} ${toTitleCase(user.lastname)}`;
    showConfirmDialog({
      icon: 'warning',
      title: `¿Desea eliminar el usuario ${usuario}?`,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          await UserServices.Delete(token, user.id);
          setPagination({
            ...pagination,
            page: pagination.page
          })
          showToast('success', `Se eliminó usuario ${usuario}`);
        } catch (error) {
          showToast('error', error?.message);
        }
      },
    });
  };

  const enableUser = async (user) => {
    const usuario = `${toTitleCase(user.name)} ${toTitleCase(user.lastname)}`;
    showConfirmDialog({
      icon: 'warning',
      title: `¿Desea habilitar el usuario ${usuario}?`,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          await UserServices.Enable(token, user.id);
          setPagination({
            ...pagination,
            page: pagination.page
          })
          showToast('success', `Se habilitó usuario ${usuario}`);
        } catch (error) {
          showToast('error', error?.message);
        }
      },
    });
  };

  const assignShop = async (shop) => {
    try {
      const user = { ...assignShopUser };
      setAssignShopUser(null);
      const usuario = `${toTitleCase(user.name)} ${toTitleCase(user.lastname)}`;
      showConfirmDialog({
        icon: 'error',
        title: `¿Desea asignar la tienda ${shop?.name} al usuario ${usuario}?`,
        onConfirm: async () => {
          try {
            const token = localStorage.getItem('token');
            await ShopServices.AssignShop(token, user.id, shop.id);
            setPagination({
              ...pagination,
              page: pagination.page
            });
            showToast('success', `Se asignó la tienda al usuario ${usuario}`);
          } catch (error) {
            showToast('error', error?.message);
          }
        },
        onClose: () => {
          setEditUser(user);
        },
      });
    } catch (error) {
      showToast('error', error?.message);
    }
  }

  const searchUser = async (values) => {
    setPagination({
      ...pagination,
      search: { ...values },
    });
  };

  const clearSearch = async () => {
    setPagination({
      page: 1,
      search: {},
    })
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-4 p-6">
          <Typography variant="h6" color="white">
            Listado de Usuarios
          </Typography>
        </CardHeader>
        <Formik initialValues={initialSearch} onSubmit={searchUser}>
          {
            ({ resetForm }) => (
              <Form className='mx-4 mb-4'>
                <div className="flex flex-wrap gap-4">
                  <div className="w-full sm:w-[48%] lg:w-auto">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      as="label"
                      htmlFor="name"
                    >
                      Nombre
                    </Typography>
                    <Field
                      as={Input}
                      variant="outlined"
                      placeholder="John"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      name="name"
                      id="name"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      autoComplete="name"
                    />
                  </div>
                  <div className="w-full sm:w-[48%] lg:w-auto">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      as="label"
                      htmlFor="lastname"
                    >
                      Apellido
                    </Typography>
                    <Field
                      as={Input}
                      variant="outlined"
                      placeholder="Doe"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      name="lastname"
                      id="lastname"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      autoComplete="lastname"
                    />
                  </div>
                  <div className="w-full sm:w-[48%] lg:w-auto">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
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
                  </div>
                  <div className="w-full sm:w-[48%] lg:w-auto">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      as="label"
                      htmlFor="phone"
                    >
                      Teléfono
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
                  </div>
                  <div className="w-full sm:w-[48%] lg:w-auto">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      as="label"
                      htmlFor="role"
                    >
                      Rol
                    </Typography>
                    <Field name="role">
                      {({ field, form }) => (
                        <Select
                          variant="outlined"
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          id="role"
                          autoComplete="role"
                          value={field.value}
                          onChange={(e) => form.setFieldValue(field.name, e)}
                        >
                          <Option value="">TODOS</Option>
                          <Option value="ADMIN">ADMINISTRADOR</Option>
                          <Option value="VENDOR">VENDEDOR</Option>
                          <Option value="BUYER">COMPRADOR</Option>
                        </Select>
                      )}
                    </Field>
                  </div>
                  <div className="w-full sm:w-[48%] lg:w-auto">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      as="label"
                      htmlFor="status"
                    >
                      Estado
                    </Typography>
                    <Field name="status">
                      {({ field, form }) => (
                        <Select
                          variant="outlined"
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          id="status"
                          autoComplete="status"
                          value={field.value}
                          onChange={(e) => form.setFieldValue(field.name, e)}
                        >
                          <Option value=''>TODOS</Option>
                          <Option value='ENABLED'>DISPONIBLE</Option>
                          <Option value='DISABLED'>INACTIVO</Option>
                        </Select>
                      )}
                    </Field>
                  </div>
                  <div className="w-full sm:w-[48%] lg:w-auto flex gap-2 items-end">
                    <Button fullWidth type="submit" color='indigo' className='h-auto' title='Buscar'>
                      Buscar
                    </Button>
                    <Button fullWidth type='button' color='teal' className='h-auto' title='Limpiar' onClick={() => {
                      resetForm();
                      clearSearch();
                    }}>
                      Limpiar
                    </Button>
                  </div>
                </div>
              </Form>
            )
          }
        </Formik>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 pb-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  'Nombre',
                  'Correo',
                  'Teléfono',
                  'Rol',
                  'Tienda',
                  'Estado',
                  '',
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listUsers.data.map((user, key) => {
                const className = `py-3 px-5 ${key === listUsers.data.length - 1
                  ? ''
                  : 'border-b border-blue-gray-50'
                  }`;

                return (
                  <tr key={user.id} className='hover:bg-blue-gray-50 hover:cursor-pointer'>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold titlecase"
                        >
                          {toTitleCase(user.name)} {toTitleCase(user.lastname)}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="font-medium text-blue-gray-600"
                      >
                        {user.email}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="mb-1 block gap-6 font-medium text-blue-gray-600"
                      >
                        {user.phone}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="mb-1 gap-6 font-medium text-blue-gray-600"
                        as={'div'}
                      >
                        {user.role === Roles.ADMINISTRADOR ? (
                          <Chip
                            variant="outlined"
                            value="Administrador"
                            color="deep-orange"
                            className="inline"
                          />
                        ) : user.role === Roles.VENDEDOR ? (
                          <Chip
                            variant="outlined"
                            value="Vendedor"
                            color="indigo"
                            className="inline"
                          />
                        ) : (
                          <Chip
                            variant="outlined"
                            value="Comprador"
                            color="teal"
                            className="inline"
                          />
                        )}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="font-medium text-blue-gray-600 w-10/12"
                      >
                        {user.shop?.name || ''}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="mb-1 block gap-6 font-medium text-blue-gray-600"
                        as={'div'}
                      >
                        {user.status ? (
                          <Chip
                            variant="outlined"
                            value="Disponible"
                            color="green"
                            className="inline"
                          />
                        ) : (
                          <Chip
                            variant="outlined"
                            value="Inactivo"
                            color="red"
                            className="inline"
                          />
                        )}
                      </Typography>
                    </td>
                    <td className={`${className} flex gap-2`}>
                      <IconButton
                        variant="gradient"
                        color="blue"
                        onClick={() => {
                          setEditUser({ ...user });
                        }}
                        disabled={!user.status}
                        title='Editar'
                      >
                        <PencilSquareIcon className="h-5 w-5 text-blue" />
                      </IconButton>
                      {
                        user.role === Roles.VENDEDOR && (
                          <IconButton
                            variant="gradient"
                            color="indigo"
                            onClick={() => setAssignShopUser(user)}
                            title='Asignar Tienda'
                          >
                            <BuildingStorefrontIcon className="h-5 w-5 text-amber" />
                          </IconButton>
                        )
                      }
                      {user.status ? (
                        <IconButton
                          variant="gradient"
                          color="red"
                          onClick={() => deleteUser(user)}
                          title='Eliminar'
                        >
                          <TrashIcon className="h-5 w-5 text-red" />
                        </IconButton>
                      ) : (
                        <IconButton
                          variant="gradient"
                          color="green"
                          onClick={() => enableUser(user)}
                          title='Habilitar'
                        >
                          <CheckCircleIcon className="h-5 w-5 text-green" />
                        </IconButton>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <div className="flex justify-between items-center my-2 mx-4">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            title='Página anterior'
          >
            <BackwardIcon strokeWidth={2} className="h-5 w-5 text-inherit" />
          </button>
          <div>
            <span className="text-sm text-gray-600">
              Mostrando {(pagination.page - 1) * itemsPerPage + 1} - {Math.min(pagination.page * itemsPerPage, listUsers.total)} de {listUsers.total} usuarios
            </span>
          </div>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= listUsers.nroPages}
            title='Página siguiente'
          >
            <ForwardIcon strokeWidth={2} className="h-5 w-5 text-inherit" />
          </button>
        </div>
      </Card>
      <EditUserDialog
        editUser={editUser}
        setEditUser={setEditUser}
        updateUser={updateUser}
      />
      <AssignShop
        assignShopUser={assignShopUser}
        setAssignShopUser={setAssignShopUser}
        assignShop={assignShop}
      />
    </div>
  );
}

export default ListUsers;
