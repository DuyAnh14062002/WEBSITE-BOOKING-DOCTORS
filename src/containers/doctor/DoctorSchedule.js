import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import Header from "./../Header/Header";
import "./DoctorSchedule.scss";
import Select from "react-select";
import * as actions from "./../../store/actions/adminAction";
import { languages } from "./../../utils";
//import moment from "moment";
import DatePicker from "./../../components/Input/DatePicker";
//import { dateFormat } from "./../../utils/constant";
import _ from "lodash";
import { toast } from "react-toastify";
import { saveBulkScheduleService } from "../../services/doctorService";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      optionDoctor: [],
      rangetime: [],
      date: "",
    };
  }
  BuildDataInputSelect = (inputdata) => {
    let result = [];
    if (inputdata && inputdata.length > 0) {
      inputdata.map((item, index) => {
        let object = {};
        object.value = item.id;
        object.label = `${item.lastName} ${item.firstName}`;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listDoctors !== this.props.listDoctors) {
      let dataSelect = this.BuildDataInputSelect(this.props.listDoctors);
      this.setState({
        optionDoctor: dataSelect,
      });
    }
    if (prevProps.AllTimeSchedules !== this.props.AllTimeSchedules) {
      let data = this.props.AllTimeSchedules;
      if (data && data.length > 0) {
        data = data.map((item) => {
          return { ...item, isSelected: false };
        });
        this.setState({
          rangetime: data,
        });
      }
    }
  }
  async componentDidMount() {
    await this.props.getAllDoctor();
    await this.props.getAllCodeTime();
  }
  handleChange = (selectedOption) => {
    this.setState({
      selectedOption: selectedOption,
    });
  };
  handleSelect = (time) => {
    let { rangetime } = this.state;
    if (rangetime && rangetime.length > 0) {
      rangetime = rangetime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      this.setState({
        rangetime: rangetime,
      });
    }
  };
  handleChangePicker = (e) => {
    this.setState({
      date: new Date(e[0]).getTime(),
    });
  };
  handleSaveSchedule = async () => {
    let { selectedOption, rangetime, date } = this.state;
    if (!selectedOption) {
      toast.error("Missing select doctor option !!!");
      return;
    }
    if (!date) {
      toast.error("Missing date parameter !!!");
      return;
    }
    let result = [];
    let selectedTime = rangetime.filter((item) => item.isSelected === true);
    if (selectedTime && selectedTime.length > 0) {
      selectedTime.forEach((item) => {
        let object = {};
        object.date = date;
        object.doctorId = selectedOption.value;
        object.timeType = item.keyMap;
        result.push(object);
      });
    } else {
      toast.error("Empty selected time !!!");
    }
    let res = await saveBulkScheduleService(result);
    if (res.data.errCode === 0) {
      toast.success("Create schedule success");
    }
  };
  render() {
    let { rangetime } = this.state;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const { language } = this.props;
    return (
      <>
        <Header />
        <h2 className="title-schedule">
          <FormattedMessage id="doctor.manage-schedule-doctor" />
        </h2>
        <div className="container">
          <div className="row">
            <div className="col-6 select-options">
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.optionDoctor}
                placeholder={"Chọn bác sĩ"}
              />
            </div>
            <div className="col-6">
              <DatePicker
                className="form-control date-picker"
                onChange={(e) => this.handleChangePicker(e)}
                minDate={yesterday}
                placeholder={"Chọn thời gian khám bệnh"}
              />
            </div>
            <div className="select-time-container">
              {rangetime &&
                rangetime.map((item, index) => {
                  return (
                    <div
                      className={
                        item.isSelected === true
                          ? "select-item active"
                          : "select-item"
                      }
                      key={index}
                      onClick={() => this.handleSelect(item)}
                    >
                      {languages.VI === language ? item.valueVi : item.valueEn}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="button-schedule">
            <button
              className="btn btn-primary"
              onClick={this.handleSaveSchedule}
            >
              Lưu thông tin
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    listDoctors: state.admin.listDoctor,
    AllTimeSchedules: state.admin.AllTimeSchedules,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctor: () => dispatch(actions.getAllDocTorAction()),
    getAllCodeTime: () => dispatch(actions.getAllCodeTimeAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
