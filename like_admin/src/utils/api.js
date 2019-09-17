import axios from 'axios';
import qs from 'query-string';

import typesOfLikes from './entities/TypesOfLikes/typesOfLikesPanel';

axios.interceptors.request.use(
  config => ({
    ...config,
    withCredentials: true,
    timeout: 30000,
    paramsSerializer: params => qs.stringify(params, { encode: false }),
  }),
  error => Promise.reject(error)
);

export default {
  ...typesOfLikes,
};