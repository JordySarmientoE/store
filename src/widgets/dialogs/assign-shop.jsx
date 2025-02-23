import { ShopServices } from '@/services';
import { Button, Card, CardBody, Dialog, Input, List, ListItem, Typography } from '@material-tailwind/react';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio')
});

const AssignShop = ({ assignShopUser, setAssignShopUser, assignShop }) => {
  const [selectedShop, setSelectedShop] = useState(assignShopUser?.shop);
  const [listShop, setListShop] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const handleOpen = () => {
    setAssignShopUser(null);
    setListShop([]);
  };

  const handleEdit = () => {
    if (!selectedShop) return;
    assignShop(selectedShop);
  };

  useEffect(() => {
    setSelectedShop(null);
    const delaySearch = setTimeout(async () => {
      const shops = await ShopServices.ListPaginated({
        page: 1,
        rows: itemsPerPage,
        name: searchTerm,
        status: 'ENABLED'
      });
      setListShop(shops.data);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

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
                      placeholder="Tiendita"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue("name", value);
                        setSearchTerm(value);
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
                    {touched.name && !selectedShop && (
                      <Typography
                        variant="small"
                        color="red"
                        className="text-xs font-medium"
                        style={{ marginTop: '-20px' }}
                      >
                        Se debe seleccionar una tienda
                      </Typography>
                    )}
                  </div>
                  {listShop.length > 0 && (
                    <Card className="absolute w-full mt-2 shadow-lg">
                      <List>
                        {listShop.map((option) => (
                          <ListItem
                            key={option?.id}
                            className="cursor-pointer"
                            onClick={() => {
                              setListShop([]);
                              setSelectedShop(option);
                              setFieldValue("name", option?.name);
                            }}
                          >
                            {option?.name}
                          </ListItem>
                        ))}
                      </List>
                    </Card>
                  )}
                  <div className="w-full flex gap-6">
                    <Button
                      className="mt-6 w-1/2 flex justify-center"
                      type="button"
                      color="blue"
                      variant="gradient"
                      onClick={handleEdit}
                    >
                      Editar
                    </Button>
                    <Button
                      className="mt-6 w-1/2 flex justify-center"
                      color="gray"
                      variant="gradient"
                      onClick={() => handleOpen()}
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
