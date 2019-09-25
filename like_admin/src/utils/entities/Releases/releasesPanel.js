import axios from 'axios';

const pathCrmccbe = process.env.REACT_APP_BE;

export default {
  fetchReleases: () => axios.get(`${pathCrmccbe}:11270/adminLike/`), //
  createReleases: params => axios.post(`${pathCrmccbe}:11270/adminLike/`, params), //
  deleteReleases: params => axios.get(`${pathCrmccbe}:11270/adminLike/`, { params }), //
};
