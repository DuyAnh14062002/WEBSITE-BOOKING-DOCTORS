import axios from "../axios";
const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (id) => {
  return axios.get(`/api/get-all-user?id=${id}`);
};

const createNewUserSevice = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserSevice = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserSevice = (data) => {
  return axios.put("/api/update-user", data);
};

const getAllCodeSevice = (inputType) => {
  return axios.get("/api/allcodes", {
    params: {
      type: inputType,
    },
  });
};
const saveBookingApointMent = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserSevice,
  deleteUserSevice,
  editUserSevice,
  getAllCodeSevice,
  saveBookingApointMent,
};
