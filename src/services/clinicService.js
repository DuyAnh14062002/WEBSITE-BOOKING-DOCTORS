import axios from "../axios";
const createClinic = (data) => {
  return axios.post(`/api/create-clinic`, data);
};
const getAllClinic = () => {
  return axios.get(`/api/get-all-clinic`);
};
const getDetailClinic = (id, location) => {
  return axios.get(`/api/get-Detail-Clinic-By-Id?id=${id}`);
};
export { createClinic, getAllClinic, getDetailClinic };
