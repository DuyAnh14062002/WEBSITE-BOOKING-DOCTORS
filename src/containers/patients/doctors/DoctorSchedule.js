import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { languages } from "./../../../utils/constant";
//import HomeHeader from "../../HomePage/HomeHeader";
//import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/doctorService";
import moment from "moment";
import "./DoctorSchedule.scss";
import BookingModal from "./BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      timeSchedules: [],
      isShowModal: false,
      doctorId: "",
      datatime: {},
    };
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.lang !== this.props.lang) {
      this.setArrDay(this.props.lang);
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.state.allDays;
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      if (
        res &&
        res.data &&
        res.data.data &&
        res.data.data.data &&
        res.data.data.errCode === 0
      ) {
        this.setState({
          timeSchedules: res.data.data.data,
        });
      }
    }
  }
  async componentDidMount() {
    const language = this.props.lang;
    await this.setArrDay(language);
    let allDays = this.state.allDays;
    console.log("allday : ", allDays);
    let res = await getScheduleDoctorByDate(
      this.props.doctorIdFromParent,
      allDays[0].value
    );
    if (
      res &&
      res.data &&
      res.data.data &&
      res.data.data.data &&
      res.data.data.errCode === 0
    ) {
      this.setState({
        timeSchedules: res.data.data.data,
      });
    }
  }
  setArrDay = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === languages.VI) {
        if (i === 0) {
          let ddmm = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddmm}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .locale("vi")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLeter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddmm = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddmm}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    this.setState({
      allDays: allDays,
    });
  };
  HandleOnchangeSelect = async (e) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = e.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (
        res &&
        res.data &&
        res.data.data &&
        res.data.data.data &&
        res.data.data.errCode === 0
      ) {
        this.setState({
          timeSchedules: res.data.data.data,
        });
      }
    }
  };
  capitalizeFirstLeter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  handleShowModal = (item) => {
    this.setState({
      isShowModal: true,
      doctorId: item.doctorId,
      datatime: item,
    });
  };
  handleHideModal = () => {
    this.setState({
      isShowModal: false,
    });
  };
  render() {
    //let doctor = this.state.doctor;
    let { allDays, timeSchedules } = this.state;
    // let nameVi = "";
    // let nameEn = "";
    // if (doctor && doctor.positionData) {
    //   nameVi = `${doctor.positionData.valueVi} , ${doctor.lastName} ${doctor.firstName}`;
    //   nameEn = `${doctor.positionData.valueEn} , ${doctor.firstName} ${doctor.lastName}`;
    // }
    let language = this.props.lang;
    let doctorId = this.state.doctorId;
    return (
      <>
        <div className="container-schedule">
          <div className="content-left">
            <select onChange={(event) => this.HandleOnchangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
            <div className="title-calender">
              <i className="fa-solid fa-calendar-days"></i>
              <span>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>
            <div className="time-schedule">
              {timeSchedules && timeSchedules.length > 0 ? (
                timeSchedules.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => this.handleShowModal(item)}
                    >
                      {language === languages.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn}
                    </button>
                  );
                })
              ) : (
                <div>
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
            <div style={{ marginTop: "10px" }}>
              Đặt lịch miễn phí{" "}
              <i
                style={{ marginLeft: "5px" }}
                class="fa-solid fa-hand-point-up"
              >
                {" "}
              </i>
            </div>
          </div>
          <BookingModal
            isShowModal={this.state.isShowModal}
            handleHideModal={this.handleHideModal}
            doctorId={doctorId}
            datatime={this.state.datatime}
            doctorName={this.props.doctorName}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
