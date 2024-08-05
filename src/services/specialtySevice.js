import axios from "../axios";
const createSpecialty = (data) => {
  return axios.post(`/api/create-specialist`, data);
};
const getAllSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};

const getDetailSpecialty = (id, location) => {
  return axios.get(
    `/api/get-Detail-Specialty-By-Id?id=${id}&location=${location}`
  );
};
export { createSpecialty, getAllSpecialty, getDetailSpecialty };
