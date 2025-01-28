import axios from '../axios';

const PATH_URL = 'companies';

export const createRequest = (user) => axios.post(`/${PATH_URL}`, user);

export const updateRequest = (data) => axios.patch(`/${PATH_URL}`, data);

export default { createRequest, updateRequest };