import ServicesConstants from './constants.services';
import Services from './main.services';

const AuthServices = {
  Login: async (body) => {
    const response = await Services.post({
      body,
      url: ServicesConstants.AuthPath?.concat('/login'),
    });
    return response;
  },
};

export default AuthServices;
