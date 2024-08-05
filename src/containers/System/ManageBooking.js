import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageBooking.scss";
import * as actions from "./../../store/actions/adminAction";
import Header from "../Header/Header";
import DatePicker from "./../../components/Input/DatePicker";
import { FormattedMessage } from "react-intl";
import { getAllBookingByDoctorIdAndDate } from "../../services/bookingService";
import moment from "moment";
import BookingConfirmModal from "./BookingConfirmModal";
class ManageBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      arrBooking: [],
      isShowModal: false,
      namePatient: "",
      patientId: "",
      timeType: "",
    };
  }
  handleChangePicker = async (e) => {
    this.setState({
      ...this.state,
      date: new Date(e[0]).getTime(),
    });
    let data = {
      doctorId: this.props.userInfo.user.id,
      date: this.state.date,
    };
    let res = await getAllBookingByDoctorIdAndDate(data);
    if (res.data.data.data) {
      this.setState({
        arrBooking: res.data.data.data,
      });
    }
  };
  handleConfirm = (name, patientId, timeType) => {
    this.setState({
      isShowModal: true,
      namePatient: name,
      patientId: patientId,
      timeType: timeType,
    });
  };
  handleHideModal = () => {
    this.setState({
      isShowModal: false,
    });
  };
  handleShowModal = () => {
    this.setState({
      isShowModal: true,
    });
  };
  render() {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let { arrBooking } = this.state;
    return (
      <>
        <Header />
        <h2 className="text-center " style={{ marginTop: "20px" }}>
          <FormattedMessage id="doctor.manage-booking" />
        </h2>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <label>
                <FormattedMessage id="doctor.choose-day" />
              </label>
              <DatePicker
                className="form-control date-picker"
                onChange={(e) => this.handleChangePicker(e)}
                //minDate={yesterday}
                placeholder={"Chọn thời gian khám bệnh"}
              />
            </div>
            <div className="col-12">
              <div className="users-table">
                <table id="customers">
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Giới tính</th>
                      <th>Actions</th>
                    </tr>
                    {arrBooking &&
                      arrBooking.length > 0 &&
                      arrBooking.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.TimeTypeData.valueVi}</td>
                            <td>{item.PatientInfoData.firstName}</td>
                            <td>{item.PatientInfoData.address}</td>
                            <td>{item.PatientInfoData.genderData.valueVi}</td>
                            <td>
                              <button
                                className="btn-confirm"
                                onClick={() =>
                                  this.handleConfirm(
                                    item.PatientInfoData.firstName,
                                    item.patientId,
                                    item.timeType
                                  )
                                }
                                style={{ backgroundColor: "orange" }}
                              >
                                Xác nhận
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <BookingConfirmModal
          isShowModal={this.state.isShowModal}
          handleHideModal={this.handleHideModal}
          handleShowModal={this.handleShowModal}
          namePatient={this.state.namePatient}
          patientId={this.state.patientId}
          timeType={this.state.timeType}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrUsers: state.admin.listUser,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(actions.DeleteUserAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
