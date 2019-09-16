import axios from 'axios';

// const pathCrmccbe = process.env.REACT_APP_BE;

export default {
  fetchUserDataApi: params => axios.get('https://t2ru-crmbe-pp:6061/identifier', { params }),
};
