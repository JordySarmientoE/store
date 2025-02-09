import ServicesConstants from './constants.services';
import Services from './main.services';

const ShopServices = {
  List: async () => {
    const response = await Services.get({
      url: ServicesConstants.ShopPath,
    });
    return response;
  },
  GetShop: async (shopId) => {
    const response = await Services.get({
      url: ServicesConstants.ShopPath.concat(`/${shopId}`),
    });
    return response;
  },
  ListPaginated: async (token, page, rows) => {
    const response = await Services.get({
      url: ServicesConstants.ShopPath.concat('/list'),
      token,
      queryParams: {
        page,
        rows,
      },
    });
    return response;
  },
  Delete: async (token, shopId) => {
    const response = await Services.delete({
      url: ServicesConstants.ShopPath.concat(`/${shopId}`),
      token,
    });
    return response;
  },
  Enable: async (token, shopId) => {
    const response = await Services.put({
      url: ServicesConstants.ShopPath.concat(`/enable/${shopId}`),
      token,
    });
    return response;
  },
  Edit: async (token, shopId, body) => {
    const response = await Services.put({
      url: ServicesConstants.ShopPath.concat(`/edit/${shopId}`),
      token,
      body,
    });
    return response;
  },
};

export default ShopServices;
