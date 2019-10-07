import axios from 'axios';

const pathCrmccbe = process.env.REACT_APP_BE;

export default {
  deleteFeaturesFromReleases: params =>
    axios.post(`${pathCrmccbe}:11270/adminLike/deleteReleaseFeature`, params),
};
