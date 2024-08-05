import axios from "../axios";
const getTopDoctorService = (limit) => {
  return axios.get(`/api/get-top-docter?limit=${limit}`);
};
const getAllDoctorService = () => {
  return axios.get(`/api/get-all-doctor`);
};
const saveInfoDoctorSevice = (data) => {
  return axios.post(`/api/save-info-doctor`, data);
};
const getDetailDoctorById = (id) => {
  return axios.get(`/api/get-detail-doctor-by-Id?id=${id}`);
};
const saveBulkScheduleService = (data) => {
  return axios.post("/api/save-bulk-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraDoctorInforById = (doctorId) => {
  return axios.get(`/api/get-Extrainfor-Doctor?doctorId=${doctorId}`);
};
const getDoctorInforById = (doctorId) => {
  return axios.get(`/api/get-Info-Doctor?doctorId=${doctorId}`);
};
const VerifyBookingApointMent = (data) => {
  return axios.post("/api/verify-book-apointment", data);
};

export {
  getTopDoctorService,
  getAllDoctorService,
  saveInfoDoctorSevice,
  getDetailDoctorById,
  saveBulkScheduleService,
  getScheduleDoctorByDate,
  getExtraDoctorInforById,
  getDoctorInforById,
  VerifyBookingApointMent,
};
