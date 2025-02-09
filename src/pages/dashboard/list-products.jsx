import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  IconButton,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { ProductServices, UserServices } from '@/services';
import { formatMoney, toTitleCase } from '@/utils/functions.helper';
import {
  BackwardIcon,
  CheckCircleIcon,
  ForwardIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { showConfirmDialog, showToast } from '@/utils/alerts';
import EditUserDialog from '@/widgets/dialogs/edit-user';

export function ListProduct() {
  const [pagination, setPagination] = useState({
    total: 0,
    nroPages: 1,
    page: 1,
    data: [],
  });
  const itemsPerPage = 5;
  const [editUser, setEditUser] = useState(null);

  const getListOfProducts = async (page) => {
    try {
      const token = localStorage.getItem('token');
      const res = await ProductServices.MyProducts(token, page, itemsPerPage);
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
    getListOfProducts(1);
  }, []);

  const handlePageChange = async (page) => {
    await getListOfProducts(page);
  };

  const updateUser = async (product) => {
    try {
      setEditUser(null);
      const usuario = `${toTitleCase(product.name)} ${toTitleCase(product.lastname)}`;
      showConfirmDialog({
        icon: 'error',
        title: `¿Desea editar el usuario ${usuario}?`,
        onConfirm: async () => {
          try {
            const token = localStorage.getItem('token');
            await UserServices.Edit(token, product.id, product);
            await getListOfProducts(pagination.page);
            showToast('success', `Se editó el usuario ${usuario}`);
          } catch (error) {
            showToast('error', error?.message);
          }
        },
        onClose: () => {
          setEditUser(product);
        },
      });
    } catch (error) {
      showToast('error', error?.message);
    }
  };

  const deleteProduct = async (product) => {
    showConfirmDialog({
      icon: 'error',
      title: `¿Desea eliminar el producto ${toTitleCase(product.name)}?`,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          await ProductServices.Delete(token, product.id);
          await getListOfProducts(pagination.page);
          showToast('success', `Se eliminó el producto ${toTitleCase(product.name)}`);
        } catch (error) {
          showToast('error', error?.message);
        }
      },
    });
  };

  const enableUser = async (product) => {
    const usuario = `${toTitleCase(product.name)} ${toTitleCase(product.lastname)}`;
    showConfirmDialog({
      icon: 'success',
      title: `¿Desea habilitar el usuario ${usuario}?`,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          await UserServices.Enable(token, product.id);
          await getListOfProducts(pagination.page);
          showToast('success', `Se habilitó usuario ${usuario}`);
        } catch (error) {
          showToast('error', error?.message);
        }
      },
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Listado de Productos
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  'Nombre',
                  'Descripción',
                  'Categoria',
                  'Precio',
                  'Cantidad',
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
              {pagination.data.map((product, key) => {
                const className = `py-3 px-5 ${
                  key === pagination.data.length - 1
                    ? ''
                    : 'border-b border-blue-gray-50'
                }`;

                return (
                  <tr key={product.id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold titlecase"
                        >
                          {toTitleCase(product.name)}
                        </Typography>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="font-medium text-blue-gray-600"
                      >
                        {product.description}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="mb-1 block gap-6 font-medium text-blue-gray-600"
                      >
                        {product.category?.name || ''}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="font-medium text-blue-gray-600 w-10/12"
                      >
                        {formatMoney(product.price)}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="font-medium text-blue-gray-600 w-10/12"
                        as="div"
                      >
                        {product.quantity > 0 ? (
                          <Chip
                            variant="filled"
                            value={product.quantity}
                            color="green"
                            className='inline'
                          />
                        ) : (
                          <Chip
                            variant="filled"
                            value={product.quantity}
                            color="red"
                            className="inline"
                          />
                        )}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="mb-1 block gap-6 font-medium text-blue-gray-600"
                        as={'div'}
                      >
                        {product.status ? (
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
                          setEditUser(product);
                        }}
                        disabled={!product.status}
                      >
                        <PencilSquareIcon className="h-5 w-5 text-blue" />
                      </IconButton>
                      {product.status ? (
                        <IconButton
                          variant="gradient"
                          color="red"
                          onClick={() => deleteProduct(product)}
                        >
                          <TrashIcon className="h-5 w-5 text-red" />
                        </IconButton>
                      ) : (
                        <IconButton
                          variant="gradient"
                          color="green"
                          onClick={() => enableUser(product)}
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
          <div className="flex justify-between items-center mt-2 mx-4">
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
        </CardBody>
      </Card>
      <EditUserDialog
        editUser={editUser}
        setEditUser={setEditUser}
        updateUser={updateUser}
      />
    </div>
  );
}

export default ListProduct;
