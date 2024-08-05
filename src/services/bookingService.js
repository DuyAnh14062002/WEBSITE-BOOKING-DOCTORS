import axios from "../axios";

const getAllBookingByDoctorIdAndDate = (data) => {
  return axios.get(
    `/api/get-booking-by-doctor-and-day?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const ConFirmBooking = (data) => {
  return axios.post("/api/sent-invoice-medical", data);
};
export { getAllBookingByDoctorIdAndDate, ConFirmBooking };
