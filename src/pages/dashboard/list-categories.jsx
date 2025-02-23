import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  IconButton,
  Input,
  Button,
  Select,
  Option,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { ShopServices } from '@/services';
import { toTitleCase } from '@/utils/functions.helper';
import {
  BackwardIcon,
  CheckCircleIcon,
  ForwardIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { showConfirmDialog, showToast } from '@/utils/alerts';
import EditStoreDialog from '@/widgets/dialogs/edit-store';
import { Field, Form, Formik } from 'formik';
import CategoryServices from '@/services/category';

export function ListCategories() {
  const [pagination, setPagination] = useState({
    page: 1,
    search: {}
  });
  const [listStores, setListStores] = useState({
    total: 0,
    nroPages: 1,
    data: [],
  });
  const itemsPerPage = 5;
  const [editStore, setEditStore] = useState(null);
  const initialSearch = { name: '', status: '' };

  const getListOfStores = async (page) => {
    try {
      const token = localStorage.getItem('token');
      const res = await CategoryServices.List(token, {
        page,
        rows: itemsPerPage,
        ...pagination.search
      });
      setListStores({
        total: res.total,
        nroPages: res.nroPages,
        data: res.data
      });
    } catch (error) {
      showToast('error', error?.message);
    }
  };

  useEffect(() => {
    getListOfStores(pagination.page);
  }, [pagination]);

  const handlePageChange = async (page) => {
    setPagination({
      ...pagination,
      page
    });
  };

  const enableStore = async (store) => {
    showConfirmDialog({
      icon: 'success',
      title: `¿Desea habilitar la tienda ${store.name}?`,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          await ShopServices.Enable(token, store.id);
          setPagination({
            ...pagination,
            page: pagination.page
          });
          await getListOfStores(pagination.page);
          showToast('success', `Se habilitó la tienda ${store.name}`);
        } catch (error) {
          showToast('error', error?.message);
        }
      },
    });
  };

  const deleteStore = async (store) => {
    showConfirmDialog({
      icon: 'error',
      title: `¿Desea eliminar la tienda ${store.name}?`,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          await ShopServices.Delete(token, store.id);
          setPagination({
            ...pagination,
            page: pagination.page
          });
          showToast('success', `Se eliminó la tienda ${store.name}`);
        } catch (error) {
          showToast('error', error?.message);
        }
      },
    });
  };

  const updateStore = async (store) => {
    try {
      setEditStore(null);
      showConfirmDialog({
        icon: 'error',
        title: `¿Desea editar la tienda ${store.name}?`,
        onConfirm: async () => {
          try {
            const token = localStorage.getItem('token');
            await ShopServices.Edit(token, store.id, store);
            setPagination({
              ...pagination,
              page: pagination.page
            });
            showToast('success', `Se editó la tienda ${store.name}`);
          } catch (error) {
            showToast('error', error?.message);
          }
        },
        onClose: () => {
          setEditStore(store);
        },
      });
    } catch (error) {
      showToast('error', error?.message);
    }
  };

  const seachStore = async (values) => {
    setPagination({
      ...pagination,
      search: { ...values }
    });
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-4 p-6">
          <Typography variant="h6" color="white">
            Listado de Tiendas
          </Typography>
        </CardHeader>
        <Formik initialValues={initialSearch} onSubmit={seachStore}>
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
                      placeholder="Lapiceros"
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
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  'Nombre',
                  'Descripción',
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
              {listStores.data.map((store, key) => {
                const className = `py-3 px-5 ${key === listStores.data.length - 1
                  ? ''
                  : 'border-b border-blue-gray-50'
                  }`;

                return (
                  <tr key={store.id} className='hover:bg-blue-gray-50 hover:cursor-pointer'>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold titlecase"
                        >
                          {toTitleCase(store.name)}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="gap-6 font-medium text-blue-gray-600"
                      >
                        {store.description}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="mb-1 block gap-6 font-medium text-blue-gray-600"
                        as={'div'}
                      >
                        {store.status ? (
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
                          setEditStore({ ...store });
                        }}
                        disabled={!store.status}
                        title='Editar'
                      >
                        <PencilSquareIcon className="h-5 w-5 text-blue" />
                      </IconButton>
                      {store.status ? (
                        <IconButton
                          variant="gradient"
                          color="red"
                          onClick={() => deleteStore(store)}
                          title='Eliminar'
                        >
                          <TrashIcon className="h-5 w-5 text-red" />
                        </IconButton>
                      ) : (
                        <IconButton
                          variant="gradient"
                          color="green"
                          onClick={() => enableStore(store)}
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
              Mostrando {(pagination.page - 1) * itemsPerPage + 1} - {Math.min(pagination.page * itemsPerPage, listStores.total)} de {listStores.total} tiendas
            </span>
          </div>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= listStores.nroPages}
            title='Página siguiente'
          >
            <ForwardIcon strokeWidth={2} className="h-5 w-5 text-inherit" />
          </button>
        </div>
      </Card>
      <EditStoreDialog
        editStore={editStore}
        setEditStore={setEditStore}
        updateStore={updateStore}
      />
    </div>
  );
}

export default ListCategories;
