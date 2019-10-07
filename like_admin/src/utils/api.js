import axios from 'axios';
import qs from 'query-string';

import typesOfLikes from './entities/TypesOfLikes/typesOfLikesPanel';
import features from './entities/Features/featuresPanel';
import releasesPanel from './entities/Releases/releasesPanel';
import releasesModal from './entities/Releases/releasesModal';

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
  ...features,
  ...releasesPanel,
  ...releasesModal,
};
