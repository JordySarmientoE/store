import axios from 'axios';

const Services = {
  post: async ({ url, body, token }) => {
    try {
      const response = await axios.post(url, body, {
        headers: {
          'x-token': token ?? undefined,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  get: async ({ url, token, queryParams }) => {
    try {
      const response = await axios.get(url, {
        headers: {
          'x-token': token ?? undefined,
        },
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  delete: async ({ url, token }) => {
    try {
      const response = await axios.delete(url, {
        headers: {
          'x-token': token ?? undefined,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  put: async ({ url, body, token }) => {
    try {
      const response = await axios.put(url, body, {
        headers: {
          'x-token': token ?? undefined,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default Services;
