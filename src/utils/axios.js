import axios from 'axios';
import { Service } from 'axios-middleware';

export const baseURL = 'https://staging-api.privcloud.com/api';

const defaultHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const service = new Service(axios);

service.register({
  onRequest(config) {
    return {
      ...config,
      headers: {
        ...config.headers,
        ...defaultHeaders(),
      },
    };
  },
});

const INSTANCE = axios.create({
  baseURL,
});

const createAxiosResponseInterceptor = () => {
  const interceptor = INSTANCE.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error && error.response && error.response.status !== 401) {
        return Promise.reject(error);
      }

      /**
       * When response status is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      INSTANCE.interceptors.response.eject(interceptor);

      return INSTANCE.post('/refresh_token')
        .then((response) => {
          localStorage.setItem('token', response.data);
          error.response.config.headers.Authorization = `Bearer ${response.data}`;

          return INSTANCE(error.response.config);
        })
        .catch((err) => {
          localStorage.clear();
          return Promise.reject(err);
        })
        .finally(createAxiosResponseInterceptor);
    },
  );
};

createAxiosResponseInterceptor();

export default INSTANCE;
