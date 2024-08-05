import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { languages } from "./../../../utils/constant";
import { getDoctorInforById } from "./../../../services/doctorService";
import { Link } from "react-router-dom";
import "./ProfileDoctor.scss";
import _ from "lodash";
import moment from "moment";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: {},
    };
  }
  getProfileDoctor = async (id) => {
    let res = await getDoctorInforById(id);
    if (res && res.data && res.data.data.errCode === 0 && res.data.data.data) {
      res.data.data.data.image = Buffer.from(
        res.data.data.data.image,
        "base64"
      ).toString("binary");
      this.setState({
        doctor: res.data.data.data,
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.doctorId !== this.props.doctorId) {
      this.getProfileDoctor(this.props.doctorId);
    }
  }
  componentDidMount() {
    this.getProfileDoctor(this.props.doctorId);
  }
  renderTimeBooking = (datatime) => {
    let { lang } = this.props;
    if (datatime && !_.isEmpty(datatime)) {
      let time =
        lang === languages.VI
          ? datatime.timeTypeData.valueVi
          : datatime.timeTypeData.valueEn;
      let date =
        lang === languages.VI
          ? moment.unix(+datatime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+datatime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>Miễn phí đặt lịch</div>
        </>
      );
    }
  };
  render() {
    let doctor = this.state.doctor;
    let { datatime, isShowDescriptionDoctor } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (doctor && doctor.positionData) {
      nameVi = `${doctor.positionData.valueVi} , ${doctor.lastName} ${doctor.firstName}`;
      nameEn = `${doctor.positionData.valueEn} , ${doctor.firstName} ${doctor.lastName}`;
    }
    let language = this.props.lang;
    return (
      <>
        <div className="doctor-info">
          <div className="doctor-info-image-container">
            <div
              className="doctor-info-image"
              style={{
                backgroundImage: `url("${
                  doctor && doctor.image ? doctor.image : ""
                }")`,
              }}
            ></div>
            <Link
              to={`/detail-doctor/${this.props.doctorId}`}
              style={{
                textDecoration: "None",
                marginLeft: "5px",
                marginTop: "3px",
              }}
            >
              <FormattedMessage id="doctor.see-more" />
            </Link>
          </div>
          <div className="doctor-info-text">
            <h2>{language === languages.VI ? nameVi : nameEn}</h2>
            {isShowDescriptionDoctor === true ? (
              <span>
                {doctor && doctor.MarkDown && doctor.MarkDown.description
                  ? doctor.MarkDown.description
                  : ""}
              </span>
            ) : (
              <>{this.renderTimeBooking(datatime)}</>
            )}
          </div>
        </div>
        {this.props.isShowInfor === true ? (
          <div className="price">
            Giá khám :{" "}
            {doctor &&
              doctor.DoctorInforData &&
              doctor.DoctorInforData.priceTypeData &&
              language === languages.VI &&
              `${doctor.DoctorInforData.priceTypeData.valueVi} VND`}
            {doctor &&
              doctor.DoctorInforData &&
              doctor.DoctorInforData.priceTypeData &&
              language === languages.EN &&
              `${doctor.DoctorInforData.priceTypeData.valueEn} $`}
          </div>
        ) : (
          ""
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
