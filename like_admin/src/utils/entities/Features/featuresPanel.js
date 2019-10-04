import axios from 'axios';

const pathCrmccbe = process.env.REACT_APP_BE;

export default {
  fetchFeatures: params => axios.get(`${pathCrmccbe}:11270/adminLike/getFeature`, { params }),
  createFeature: params => axios.post(`${pathCrmccbe}:11270/adminLike/setFeature`, params),
  deleteFeature: params => axios.post(`${pathCrmccbe}:11270/adminLike/deleteFeature`, params),
};
