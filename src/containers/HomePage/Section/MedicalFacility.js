import React, { Component } from "react";
import { connect } from "react-redux";
//import "./MedicalFacility.scss";
//import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/clinicService";
import { withRouter } from "react-router";
import "./MedicalFacility.scss";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Clinic: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.data && res.data.infor && res.data.infor.data) {
      let data = res.data.infor.data.map((item) => {
        item.image = new Buffer(item.image, "base64").toString("binary");
        return item;
      });
      this.setState({
        Clinic: data,
      });
    }
  }
  handleDetailViewClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };
  render() {
    let { Clinic } = this.state;
    return (
      <div className="section">
        <div className="section-container content-medical-facility">
          <div className="section-header">
            <span>Cơ sở y tế nổi bật</span>
            <button className="btn-medical-facility">Tìm kiếm</button>
          </div>
          <div className="section-content">
            <Slider {...this.props.settings}>
              {Clinic &&
                Clinic.length > 0 &&
                Clinic.map((item, index) => {
                  return (
                    <div
                      className="section-custom custom-medical-facility"
                      key={index}
                      onClick={() => this.handleDetailViewClinic(item)}
                    >
                      <div
                        className="section-image medical-facility-image"
                        style={{
                          backgroundImage: `url("${item.image}")`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></div>
                      <div className="section-title">{item.name}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionChangeLanguage: (lang) =>
      dispatch(actions.actionChangeLanguage(lang)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
