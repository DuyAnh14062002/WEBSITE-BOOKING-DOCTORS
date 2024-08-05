import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import { languages } from "./../../../utils/constant";
import ProfileDoctor from "./ProfileDoctor";
import DatePicker from "./../../../components/Input/DatePicker";
import moment from "moment";
import Select from "react-select";
import { saveBookingApointMent } from "../../../services/userService";
import * as actions from "./../../../store/actions/adminAction";
import { toast } from "react-toastify";
import _ from "lodash";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: {},

      name: "",
      phone: "",
      birthDay: "",
      address: "",
      gender: "",
      reason: "",
      email: "",
      timeType: "",
      doctorId: "",

      selectedGender: {},
      genders: [],
    };
  }
  handleonChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleChangePicker = (e) => {
    this.setState({
      birthDay: moment.unix(+e[0] / 1000).format("DD/MM/YYYY"),
    });
  };
  BuildDataInputSelect = (inputdata) => {
    let result = [];
    let { language } = this.props;
    if (inputdata && inputdata.length > 0) {
      inputdata.forEach((item, index) => {
        let object = {};
        object.value = item.keyMap;
        object.label = languages.VI === language ? item.valueVi : item.valueEn;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.gender !== this.props.gender) {
      let genderArr = this.BuildDataInputSelect(this.props.gender);
      this.setState({
        genders: genderArr,
      });
    }
  }
  componentDidMount() {
    this.props.getGenderStart();
  }
  handleChange = (e) => {
    this.setState({
      selectedGender: e,
      gender: e.value,
    });
  };
  renderTimeBooking = (datatime) => {
    let { language } = this.props;
    if (datatime && !_.isEmpty(datatime)) {
      let time =
        language === languages.VI
          ? datatime.timeTypeData.valueVi
          : datatime.timeTypeData.valueEn;
      let date =
        language === languages.VI
          ? moment.unix(+datatime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+datatime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return `${time} - ${date}`;
    } else {
      return "";
    }
  };
  handleSaveBooking = async () => {
    let { datatime } = this.props;
    let timeString = this.renderTimeBooking(datatime);
    let doctorName = this.props.doctorName;
    let res = await saveBookingApointMent({
      email: this.state.email,
      timeType: datatime.timeType,
      doctorId: datatime.doctorId,
      date: datatime.date,
      name: this.state.name,
      address: this.state.address,
      gender: this.state.gender,
      reason: this.state.reason,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
      phoneNumber: this.state.phone,
    });
    console.log("res : ", res);
    if (res && res.data && res.data.infor && res.data.infor.errCode === 0) {
      toast.success("Đặt lịch thành công");
    } else {
      toast.error("Đặt lịch thất bại");
    }
  };
  render() {
    //let language = this.props.language;
    let { doctorId, datatime } = this.props;
    return (
      <>
        <Modal
          isOpen={this.props.isShowModal}
          className={"modal-booking-container"}
          size="lg"
          centered
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span>
                <FormattedMessage id="doctor.infor-booking" />
              </span>
              <span
                className="btn-hide-modal"
                onClick={this.props.handleHideModal}
              >
                x
              </span>
            </div>
            <div className="booking-modal-body">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                datatime={datatime}
              />
              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="doctor.name" />
                  </label>
                  <input
                    className="form-control"
                    onChange={(e) => this.handleonChangeInput(e, "name")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="user.phone" />{" "}
                  </label>
                  <input
                    className="form-control"
                    onChange={(e) => this.handleonChangeInput(e, "phone")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="user.email" />
                  </label>
                  <input
                    className="form-control"
                    onChange={(e) => this.handleonChangeInput(e, "email")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="user.address" />
                  </label>
                  <input
                    className="form-control"
                    onChange={(e) => this.handleonChangeInput(e, "address")}
                  />
                </div>
                <div className="col-12 form-group">
                  <label>
                    <FormattedMessage id="doctor.reason" />
                  </label>
                  <input
                    className="form-control"
                    onChange={(e) => this.handleonChangeInput(e, "reason")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Ngày sinh</label>
                  <DatePicker
                    className="form-control date-picker"
                    onChange={(e) => this.handleChangePicker(e)}
                    placeholder={"Chọn thời gian khám bệnh"}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="user.gender" />
                  </label>
                  <Select
                    value={this.state.selectedGender}
                    onChange={(e) => this.handleChange(e)}
                    options={this.state.genders}
                    placeholder={"Giới Tính"}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn-confirm"
                onClick={() => this.handleSaveBooking()}
              >
                <FormattedMessage id="doctor.confirm" />
              </button>
              <button
                className="btn-cancel"
                onClick={this.props.handleHideModal}
              >
                <FormattedMessage id="doctor.cancel" />
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gender: state.admin.gender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
