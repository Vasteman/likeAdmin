import axios from 'axios';

const pathCrmccbe = process.env.REACT_APP_BE;

export default {
  fetchFeatures: () => axios.get(`${pathCrmccbe}:11270/adminLike/getFeature`),
  createFeature: params => axios.post(`${pathCrmccbe}:11270/adminLike/setReleaseFeature`, params),
  deleteFeature: featureId =>
    axios.post(`${pathCrmccbe}:11270/adminLike/deleteFeature&featureId=${featureId}`),
};
