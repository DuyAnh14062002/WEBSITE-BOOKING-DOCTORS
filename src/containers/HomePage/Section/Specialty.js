import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import "../HomePage.scss";
//import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { getAllSpecialty } from "./../../../services/specialtySevice";
import Slider from "react-slick";
import { withRouter } from "react-router";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Specialties: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.data && res.data.infor && res.data.infor.data) {
      let data = res.data.infor.data.map((item) => {
        item.image = new Buffer(item.image, "base64").toString("binary");
        return item;
      });
      this.setState({
        Specialties: data,
      });
    }
  }
  handleDetailViewSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };
  render() {
    let { Specialties } = this.state;
    return (
      <div className="section">
        <div className="section-container">
          <div className="section-header">
            <span>Chuyên khoa phổ biến</span>
            <button>XEM THÊM</button>
          </div>
          <div className="section-content">
            <Slider {...this.props.settings}>
              {Specialties &&
                Specialties.length > 0 &&
                Specialties.map((item, index) => {
                  return (
                    <div
                      className="section-custom"
                      key={index}
                      onClick={() => this.handleDetailViewSpecialty(item)}
                    >
                      <div
                        className="section-image Specialty-image"
                        style={{
                          backgroundImage: `url("${item.image}")`,
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
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
