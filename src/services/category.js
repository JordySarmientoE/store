import ServicesConstants from './constants.services';
import Services from './main.services';

const CategoryServices = {
  List: async (shopId, payload) => {
    const response = await Services.get({
      url: ServicesConstants.CategoryPath.concat(`list/shop/${shopId}`),
      queryParams: {
        ...payload,
      },
    });
    return response;
  },
};

export default CategoryServices;
