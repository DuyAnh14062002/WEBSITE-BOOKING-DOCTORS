import React, { Component } from "react";
import { connect } from "react-redux";
//import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "./../../../store/actions/appActions";
import { languages } from "./../../../utils/constant";
import { withRouter } from "react-router";
import "./FeaturedDoctor.scss";
class FeaturesDortor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.arrDoctorsRedux != this.props.arrDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.arrDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.getTopDoctor(10);
    this.setState({
      arrDoctors: this.props.arrDoctorsRedux,
    });
  }
  handleDetailViewDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };
  render() {
    const { arrDoctors } = this.state;
    const language = this.props.lang;
    let imageBase64 = "";
    return (
      <div className="section">
        <div className="section-container content-feutured-doctor">
          <div className="section-header">
            <span>Bác sĩ nổi bật tuần qua</span>
            <button className="btn-medical-facility">Tìm kiếm</button>
          </div>
          <div className="section-content content-featured-doctor">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.map((doctor, index) => {
                  let nameVi = `${doctor.positionData.valueVi} , ${doctor.lastName} ${doctor.firstName}`;
                  let nameEn = `${doctor.positionData.valueEn} , ${doctor.lastName} ${doctor.firstName}`;
                  if (doctor.image) {
                    imageBase64 = new Buffer(doctor.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div
                      className="section-custom custom-feutured-doctor"
                      key={index}
                      onClick={() => this.handleDetailViewDoctor(doctor)}
                      col-4
                    >
                      <div
                        className="section-image featured-doctor-image"
                        style={{
                          backgroundImage: `url("${imageBase64}")`,
                        }}
                      ></div>
                      <div className="section-title title-featured-doctor">
                        {language === languages.VI ? nameVi : nameEn}
                      </div>
                      <span>Da liễu</span>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    arrDoctorsRedux: state.app.topDoctors,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctor: (limit) => dispatch(actions.getTopDocTorAction(limit)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FeaturesDortor)
);
