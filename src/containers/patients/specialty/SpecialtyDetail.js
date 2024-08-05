import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./SpecialtyDetail.scss";
import { getDetailSpecialty } from "../../../services/specialtySevice";
import ProfileDoctor from "../doctors/ProfileDoctor";
import DoctorSchedule from "../doctors/DoctorSchedule";
import DoctorExtraInfor from "../doctors/DoctorExtraInfor";

class SpecialtyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Specialty: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailSpecialty(id, "ALL");
      // res.data.data.image = Buffer.from(res.data.data.image, "base64").toString(
      //   "binary"
      // );
      this.setState({
        Specialty: res.data.data.data,
      });
    }
  }
  render() {
    let { Specialty } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="title-intro">
          <i class="fa-solid fa-house"></i> / Khám chuyên khoa
        </div>
        <div
          className="intro-specialty"
          dangerouslySetInnerHTML={{
            __html:
              Specialty && Specialty.descriptionHTML
                ? Specialty.descriptionHTML
                : "",
          }}
        ></div>
        {Specialty &&
          Specialty.doctorSpecialty &&
          Specialty.doctorSpecialty.length > 0 && (
            <div className="container-detail-specialty">
              <div className="search-specialty"></div>
              {Specialty.doctorSpecialty.map((item, index) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
