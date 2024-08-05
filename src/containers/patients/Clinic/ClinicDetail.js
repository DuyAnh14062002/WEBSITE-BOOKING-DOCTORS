import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./ClinicDetail.scss";
import { getDetailClinic } from "../../../services/clinicService";
import ProfileDoctor from "../doctors/ProfileDoctor";
import DoctorSchedule from "../doctors/DoctorSchedule";
import DoctorExtraInfor from "../doctors/DoctorExtraInfor";
import { withRouter } from "react-router";
class ClinicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Clinic: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailClinic(id);
      // res.data.data.image = Buffer.from(res.data.data.image, "base64").toString(
      //   "binary"
      // );
      this.setState({
        Clinic: res.data.data.data,
      });
    }
  }
  render() {
    let { Clinic } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="title-intro">
          <i class="fa-solid fa-house"></i> / Cơ sở y tế
        </div>
        <div
          className="intro-Clinic"
          dangerouslySetInnerHTML={{
            __html:
              Clinic && Clinic.descriptionHTML ? Clinic.descriptionHTML : "",
          }}
        ></div>
        {Clinic && Clinic.doctorClinic && Clinic.doctorClinic.length > 0 && (
          <div className="container-detail-Clinic">
            <div className="search-Clinic"></div>
            {Clinic.doctorClinic.map((item, index) => {
              return (
                <div className="detail-body" key={index}>
                  <div className="detail-left">
                    <ProfileDoctor
                      doctorId={item.doctorId}
                      isShowInfor={false}
                      isShowDescriptionDoctor={true}
                    />
                  </div>
                  <div className="detail-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item.doctorId} />{" "}
                    </div>
                    <div className="doctor-extra">
                      <DoctorExtraInfor doctorId={item.doctorId} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ClinicDetail)
);
