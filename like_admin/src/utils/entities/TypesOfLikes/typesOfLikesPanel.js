import axios from 'axios';

const pathCrmccbe = process.env.REACT_APP_BE;

export default {
  fetchTypesOfLikes: () => axios.get(`${pathCrmccbe}:11270/adminLike/getLikeType`),
};
