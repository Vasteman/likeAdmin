import axios from 'axios';

const pathCrmccbe = process.env.REACT_APP_BE;

export default {
  fetchReleases: params => axios.get(`${pathCrmccbe}:11270/adminLike/getRelease`, { params }),
  createReleases: params => axios.post(`${pathCrmccbe}:11270/adminLike/setRelease`, params),
  deleteReleases: params => axios.get(`${pathCrmccbe}:11270/adminLike/deleteRelease`, { params }),
};
