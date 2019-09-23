import axios from 'axios';

const pathCrmccbe = process.env.REACT_APP_BE;

export default {
  fetchFeatures: () => axios.get(`${pathCrmccbe}:11270/adminLike/getFeature`),
};
