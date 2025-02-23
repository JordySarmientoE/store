import {
  Typography,
  Chip,
  IconButton,
  Button,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { ShopServices, UserServices } from '@/services';
import { toTitleCase } from '@/utils/functions.helper';
import {
  BuildingStorefrontIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { showConfirmDialog, showToast } from '@/utils/alerts';
import EditUserDialog from '@/widgets/dialogs/edit-user';
import { Roles, RoleSelect, StatusSelect } from '@/utils/roles';
import { Field, Form, Formik } from 'formik';
import AssignShop from '@/widgets/dialogs/assign-shop';
import { CardForm, InputForm, InputNumberForm, SelectForm, TableForm } from '@/components/ui';

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

  const assignShop = async (shop) => {
    try {
      const user = { ...assignShopUser };
      setAssignShopUser(null);
      const usuario = `${toTitleCase(user.name)} ${toTitleCase(user.lastname)}`;
      showConfirmDialog({
        icon: 'warning',
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
      });
    } catch (error) {
      showToast('error', error?.message);
    }
  }

  const handleUserAction = async (action, store) => {
    const actions = {
      enable: {
        service: UserServices.Enable,
        message: `Se habilitó el usuario ${store.name}`,
        title: `¿Desea habilitar el usuario ${store.name}?`
      },
      delete: {
        service: UserServices.Delete,
        message: `Se eliminó el usuario ${store.name}`,
        title: `¿Desea eliminar el usuario ${store.name}?`
      },
      update: {
        service: UserServices.Edit,
        message: `Se editó el usuario ${store.name}`,
        title: `¿Desea editar el usuario ${store.name}?`
      }
    };

    if (!actions[action]) return;
    const isUpdateAction = action === 'update';

    if (isUpdateAction) {
      setEditUser(null);
    }

    showConfirmDialog({
      icon: 'warning',
      title: actions[action].title,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          await actions[action].service(token, store.id, store);
          setPagination((prev) => ({ ...prev, page: prev.page }));
          showToast('success', actions[action].message);
        } catch (error) {
          showToast('error', error?.message);
        }
      },
      onClose: isUpdateAction ? () => setEditUser(store) : undefined,
    });
  };

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
      <CardForm name="Listado de Usuarios">
        <Formik initialValues={initialSearch} onSubmit={searchUser}>
          {
            ({ resetForm }) => (
              <Form className='mx-4 mb-4'>
                <div className="flex flex-wrap gap-4">
                  <InputForm name='name' label='Nombre' placeholder='John' />
                  <InputForm name='lastname' label='Apellido' placeholder='Doe' />
                  <InputForm name='email' label='Correo' placeholder='example@gmail.com' />
                  <InputNumberForm name='phone' label='Teléfono' placeholder='123456789' maxLength='9' />
                  <SelectForm name='role' label='Rol' selectValues={RoleSelect} />
                  <SelectForm name='status' label='Estado' selectValues={StatusSelect} />
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
        <TableForm pagination={pagination} handlePageChange={handlePageChange} itemsPerPage={itemsPerPage} listItems={listUsers}
          columns={[
            { label: "Nombre", render: (user) => <Typography variant="small" className="gap-6 font-medium text-blue-gray-600 font-bold titlecase">{toTitleCase(user.name)}</Typography> },
            { label: "Correo", render: (user) => <Typography variant="small" className="gap-6 font-medium text-blue-gray-600">{user.email}</Typography> },
            { label: "Teléfono", render: (user) => <Typography variant="small" className="gap-6 font-medium text-blue-gray-600">{user.phone}</Typography> },
            {
              label: "Rol", render: (user) => <Typography
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
            },
            { label: "Tienda", render: (user) => <Typography variant="small" className="gap-6 font-medium text-blue-gray-600">{user.shop?.name || ''}</Typography> },
            {
              label: "Estado",
              render: (store) => store.status ?
                <Chip variant="outlined" value="Disponible" color="green" className="inline" /> :
                <Chip variant="outlined" value="Inactivo" color="red" className="inline" />
            },
            {
              label: "Acciones",
              render: (user) => (
                <div className="flex gap-2">
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
                        disabled={!user.status}
                      >
                        <BuildingStorefrontIcon className="h-5 w-5 text-amber" />
                      </IconButton>
                    )
                  }
                  {user.status ? (
                    <IconButton
                      variant="gradient"
                      color="red"
                      onClick={() => handleUserAction("delete", user)}
                      title='Eliminar'
                    >
                      <TrashIcon className="h-5 w-5 text-red" />
                    </IconButton>
                  ) : (
                    <IconButton
                      variant="gradient"
                      color="green"
                      onClick={() => handleUserAction("enable", user)}
                      title='Habilitar'
                    >
                      <CheckCircleIcon className="h-5 w-5 text-green" />
                    </IconButton>
                  )}
                </div>
              ),
            },
          ]} />
      </CardForm>
      <EditUserDialog
        editUser={editUser}
        setEditUser={setEditUser}
        updateUser={(user) => handleUserAction("update", user)}
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
