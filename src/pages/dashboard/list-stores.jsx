import {
  Card,
  CardHeader,
  Typography,
  Chip,
  IconButton,
  Button,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { ShopServices } from '@/services';
import { toTitleCase } from '@/utils/functions.helper';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { showConfirmDialog, showToast } from '@/utils/alerts';
import EditStoreDialog from '@/widgets/dialogs/edit-store';
import { Form, Formik } from 'formik';
import { CardForm, InputForm, InputNumberForm, SelectForm, TableForm } from '@/components/ui';

export function ListStores() {
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
  const initialSearch = { name: '', address: '', ruc: '', phone: '', email: '', status: '' };

  const getListOfStores = async (page) => {
    try {
      const res = await ShopServices.ListPaginated({
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

  const handleStoreAction = async (action, store) => {
    const actions = {
      enable: {
        service: ShopServices.Enable,
        message: `Se habilitó la tienda ${store.name}`,
        title: `¿Desea habilitar la tienda ${store.name}?`
      },
      delete: {
        service: ShopServices.Delete,
        message: `Se eliminó la tienda ${store.name}`,
        title: `¿Desea eliminar la tienda ${store.name}?`
      },
      update: {
        service: ShopServices.Edit,
        message: `Se editó la tienda ${store.name}`,
        title: `¿Desea editar la tienda ${store.name}?`
      }
    };

    if (!actions[action]) return;
    const isUpdateAction = action === 'update';

    if (isUpdateAction) {
      setEditStore(null);
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
      onClose: isUpdateAction ? () => setEditStore(store) : undefined,
    });
  };

  const seachStore = async (values) => {
    setPagination({
      ...pagination,
      search: { ...values }
    });
  }

  const statusValues = [
    {
      key: '',
      label: 'TODOS'
    },
    {
      key: 'ENABLED',
      label: 'DISPONIBLE'
    },
    {
      key: 'DISABLED',
      label: 'INACTIVO'
    }
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <CardForm name="Listado de Tiendas">
        <Formik initialValues={initialSearch} onSubmit={seachStore}>
          {
            ({ resetForm }) => (
              <Form className='mx-4 mb-4'>
                <div className="flex flex-wrap gap-4">
                  <InputForm name="name" placeholder="Tienda" label="Nombre" />
                  <InputForm name="address" placeholder="Mz...." label="Dirección" />
                  <InputNumberForm name="ruc" placeholder="12345678910" label="RUC" maxLength="11" />
                  <InputNumberForm name="phone" placeholder="123456789" label="Teléfono" maxLength="9" />
                  <InputForm name="email" placeholder="example@gmail.com" label="Correo" />
                  <SelectForm name="status" label="Estado" selectValues={statusValues} />
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
        <TableForm pagination={pagination} handlePageChange={handlePageChange} itemsPerPage={itemsPerPage} listItems={listStores}
          columns={[
            { label: "Nombre", render: (store) => <Typography variant="small" className="gap-6 font-medium text-blue-gray-600 font-bold titlecase">{toTitleCase(store.name)}</Typography> },
            { label: "Dirección", render: (store) => <Typography variant="small" className="gap-6 font-medium text-blue-gray-600">{store.address}</Typography> },
            { label: "RUC", render: (store) => <Typography variant="small" className="gap-6 font-medium text-blue-gray-600">{store.ruc}</Typography> },
            { label: "Teléfono", render: (store) => <Typography variant="small" className="gap-6 font-medium text-blue-gray-600">{store.phone}</Typography> },
            { label: "Email", render: (store) => <Typography variant="small" className="gap-6 font-medium text-blue-gray-600">{store.email || ''}</Typography> },
            {
              label: "Estado",
              render: (store) => store.status ?
                <Chip variant="outlined" value="Disponible" color="green" className="inline" /> :
                <Chip variant="outlined" value="Inactivo" color="red" className="inline" />
            },
            {
              label: "Acciones",
              render: (store) => (
                <div className="flex gap-2">
                  <IconButton
                    variant="gradient"
                    color="blue"
                    onClick={() => setEditStore({ ...store })}
                    disabled={!store.status}
                    title="Editar"
                  >
                    <PencilSquareIcon className="h-5 w-5 text-blue" />
                  </IconButton>
                  {store.status ? (
                    <IconButton
                      variant="gradient"
                      color="red"
                      onClick={() => handleStoreAction("delete", store)}
                      title="Eliminar"
                    >
                      <TrashIcon className="h-5 w-5 text-red" />
                    </IconButton>
                  ) : (
                    <IconButton
                      variant="gradient"
                      color="green"
                      onClick={() => handleStoreAction("enable", store)}
                      title="Habilitar"
                    >
                      <CheckCircleIcon className="h-5 w-5 text-green" />
                    </IconButton>
                  )}
                </div>
              ),
            },
          ]} />
      </CardForm>
      <EditStoreDialog
        editStore={editStore}
        setEditStore={setEditStore}
        updateStore={(store) => handleStoreAction('update', store)}
      />
    </div>
  );
}

export default ListStores;
