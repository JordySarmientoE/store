import ServicesConstants from './constants.services';
import Services from './main.services';

const OrderServices = {
  SaveOrder: async (body, token) => {
    const response = await Services.post({
      url: ServicesConstants.OrderPath.concat('/save'),
      body,
      token,
    });
    return response;
  },
};

export default OrderServices;
