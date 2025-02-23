import { ShopServices } from '@/services';
import { Button, Card, CardBody, Dialog, Typography } from '@material-tailwind/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { InputOptionForm } from '@/components/ui';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio')
});

const AssignShop = ({ assignShopUser, setAssignShopUser, assignShop }) => {
  const [selectedShop, setSelectedShop] = useState(assignShopUser?.shop);
  const [listShop, setListShop] = useState([]);
  const itemsPerPage = 5;

  const handleOpen = () => {
    setAssignShopUser(null);
    setListShop([]);
  };

  const handleEdit = () => {
    if (!selectedShop) return;
    assignShop(selectedShop);
  };

  const findShops = async (searchTerm) => {
    const shops = await ShopServices.ListPaginated({
      page: 1,
      rows: itemsPerPage,
      name: searchTerm,
      status: 'ENABLED'
    });
    setListShop(shops.data);
  };

  const selectShop = async (shop) => {
    if(shop) {
      setListShop([]);
    }
    setSelectedShop(shop);
  };

  return (
    <>
      <Dialog
        size="xs"
        open={!!assignShopUser}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col">
            <Typography className="text-center font-bold">
              Asignar Tienda
            </Typography>

            <Formik
              initialValues={{
                name: assignShopUser?.shop?.name || "",
              }}
              validationSchema={validationSchema}
              className="flex w-full"
            >
              {({ touched, errors, setFieldValue }) => (
                <Form className="mt-4 mb-2 mx-auto w-full">
                  <InputOptionForm listOptions={listShop} errors={errors.name} touched={touched.name}
                    optionalError={{ visible: !selectedShop, message: 'Se debe seleccionar una tienda' }}
                    name="name" setFieldValue={setFieldValue} findOptions={findShops} selectOption={selectShop}
                    cleanOption={() => setListShop([])} />
                  <div className="w-full flex gap-6 -mt-4">
                    <Button
                      className="mt-6 w-1/2 flex justify-center"
                      type="button"
                      color="blue"
                      variant="gradient"
                      onClick={handleEdit}
                    >
                      Asignar
                    </Button>
                    <Button
                      className="mt-6 w-1/2 flex justify-center"
                      color="gray"
                      variant="gradient"
                      onClick={handleOpen}
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
};

export default AssignShop;
