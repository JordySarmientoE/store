import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  IconButton,
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

export function ListStores() {
  const [pagination, setPagination] = useState({
    total: 0,
    nroPages: 1,
    page: 1,
    data: [],
  });
  const [editStore, setEditStore] = useState(null);

  const itemsPerPage = 5;

  const getListOfStores = async (page) => {
    try {
      const token = localStorage.getItem('token');
      const res = await ShopServices.ListPaginated(token, page, itemsPerPage);
      setPagination({
        nroPages: res.nroPages,
        total: res.total,
        page,
        data: res.data,
      });
    } catch (error) {
      showToast('error', error?.message);
    }
  };

  useEffect(() => {
    getListOfStores(1);
  }, []);

  const handlePageChange = async (page) => {
    await getListOfStores(page);
  };

  const enableStore = async (store) => {
    showConfirmDialog({
      icon: 'success',
      title: `¿Desea habilitar la tienda ${store.name}?`,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          await ShopServices.Enable(token, store.id);
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
          await getListOfStores(pagination.page);
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
            await getListOfStores(pagination.page);
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

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-4 p-6">
          <Typography variant="h6" color="white">
            Listado de Tiendas
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  'Nombre',
                  'Dirección',
                  'RUC',
                  'Teléfono',
                  'Correo',
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
              {pagination.data.map((store, key) => {
                const className = `py-3 px-5 ${key === pagination.data.length - 1
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
                        {store.address}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="mb-1 block gap-6 font-medium text-blue-gray-600"
                      >
                        {store.ruc}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="gap-6 font-medium text-blue-gray-600"
                      >
                        {store.phone}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="gap-6 font-medium text-blue-gray-600"
                      >
                        {store.email || ''}
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
                          setEditStore(store);
                        }}
                        disabled={!store.status}
                      >
                        <PencilSquareIcon className="h-5 w-5 text-blue" />
                      </IconButton>
                      {store.status ? (
                        <IconButton
                          variant="gradient"
                          color="red"
                          onClick={() => deleteStore(store)}
                        >
                          <TrashIcon className="h-5 w-5 text-red" />
                        </IconButton>
                      ) : (
                        <IconButton
                          variant="gradient"
                          color="green"
                          onClick={() => enableStore(store)}
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
          >
            <BackwardIcon strokeWidth={2} className="h-5 w-5 text-inherit" />
          </button>
          <div>
            <span className="text-sm text-gray-600">
              Página {pagination.page} de {pagination.nroPages}
            </span>
          </div>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.nroPages}
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

export default ListStores;
