import React, { Component } from "react";
import { connect } from "react-redux";
//import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="section section-footer">
        <p>
          &copy; 2023 Đào Duy Anh. More information, please visit my youtube
          channel <a href="">click here</a>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
