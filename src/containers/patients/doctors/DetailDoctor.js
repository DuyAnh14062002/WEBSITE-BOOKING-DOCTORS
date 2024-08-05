import React, { Component } from "react";
import { connect } from "react-redux";
//import { FormattedMessage } from "react-intl";
import { languages } from "./../../../utils/constant";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailDoctorById } from "./../../../services/doctorService";
import "./DetailDoctor.scss";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: {},
    };
  }
  componentDidUpdate(prevProps, prevState) {}
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailDoctorById(id);
      console.log("res : ", res);
      res.data.data.image = Buffer.from(res.data.data.image, "base64").toString(
        "binary"
      );
      this.setState({
        doctor: res.data.data,
      });
    }
  }
  render() {
    let doctor = this.state.doctor;
    let nameVi = "";
    let nameEn = "";
    if (doctor && doctor.positionData) {
      nameVi = `${doctor.positionData.valueVi} , ${doctor.lastName} ${doctor.firstName}`;
      nameEn = `${doctor.positionData.valueEn} , ${doctor.firstName} ${doctor.lastName}`;
    }
    let language = this.props.lang;
    return (
      <>
        <HomeHeader />
        <div className="doctor-info">
          <div
            className="doctor-info-image"
            style={{
              backgroundImage: `url("${
                doctor && doctor.image ? doctor.image : ""
              }")`,
            }}
          ></div>
          <div className="doctor-info-text">
            <h2>{language === languages.VI ? nameVi : nameEn}</h2>
            <span>
              {doctor && doctor.MarkDown && doctor.MarkDown.description
                ? doctor.MarkDown.description
                : ""}
            </span>
          </div>
        </div>
        <div className="content-doctor-info">
          <div className="content-left-info">
            <DoctorSchedule
              doctorIdFromParent={doctor && doctor.id ? doctor.id : -1}
              doctorName={language === languages.VI ? nameVi : nameEn}
            />
          </div>
          <div className="content-right-info">
            <DoctorExtraInfor doctorId={this.props.match.params.id} />
          </div>
        </div>
        <div className="container-doctor-introduce">
          <div
            className="doctor-introduce"
            dangerouslySetInnerHTML={{
              __html:
                doctor && doctor.MarkDown && doctor.MarkDown.contentHTML
                  ? doctor.MarkDown.contentHTML
                  : "",
            }}
          ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
