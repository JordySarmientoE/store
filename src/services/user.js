import ServicesConstants from './constants.services';
import Services from './main.services';

const UserServices = {
  Register: async (body) => {
    const response = await Services.post({
      body,
      url: ServicesConstants.UserPath.concat('/register'),
    });
    return response;
  },
  GetInfo: async (token) => {
    const response = await Services.get({
      token,
      url: ServicesConstants.UserPath.concat('/get-info'),
    });
    return response;
  },
  List: async (token, payload) => {
    const response = await Services.get({
      url: ServicesConstants.UserPath.concat('/list'),
      token,
      queryParams: {
        ...payload,
      },
    });
    return response;
  },
  Delete: async (token, userId) => {
    await Services.delete({
      url: ServicesConstants.UserPath.concat(`/delete/${userId}`),
      token,
    });
  },
  Edit: async (token, userId, body) => {
    await Services.put({
      url: ServicesConstants.UserPath.concat(`/edit/${userId}`),
      token,
      body,
    });
  },
  Enable: async (token, userId) => {
    await Services.put({
      url: ServicesConstants.UserPath.concat(`/enable/${userId}`),
      token,
    });
  },
};

export default UserServices;
