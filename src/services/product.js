import ServicesConstants from './constants.services';
import Services from './main.services';

const ProductServices = {
  MyProducts: async (token, page, rows) => {
    const response = await Services.get({
      url: ServicesConstants.ProductPath.concat('/list'),
      token,
      queryParams: {
        page,
        rows,
      },
    });
    return response;
  },
  Delete: async (token, id) => {
    const response = await Services.delete({
      url: ServicesConstants.ProductPath.concat('/delete/'.concat(id)),
      token,
    });
    return response;
  },
};

export default ProductServices;
