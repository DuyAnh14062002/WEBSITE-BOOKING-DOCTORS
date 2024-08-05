import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import { withRouter } from "react-router";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageStatus: "vi",
    };
  }
  ChangeLanguageVi = () => {
    this.props.actionChangeLanguage("vi");
    this.setState({
      languageStatus: "vi",
    });
  };
  ChangeLanguageEn = () => {
    this.props.actionChangeLanguage("en");
    this.setState({
      languageStatus: "en",
    });
  };
  handleBackMain = () => {
    if (this.props.history) {
      this.props.history.push("/homepage");
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i class="fa-solid fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.handleBackMain()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <p className="content-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </p>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <p className="content-title">
                  <FormattedMessage id="homeheader.select-room" />
                </p>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <p className="content-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </p>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <p className="content-title">
                  <FormattedMessage id="user.save" />
                </p>
              </div>
            </div>
            <div className="right-content">
              <i class="fa-solid fa-circle-question"></i>
              <div className="suport">Hổ trợ</div>
              <div
                className={`Vi ${
                  this.state.languageStatus === "vi" ? "active" : ""
                }`}
                onClick={() => this.ChangeLanguageVi()}
              >
                Vn
              </div>
              <div
                className={`En ${
                  this.state.languageStatus === "en" ? "active" : ""
                }`}
                onClick={() => this.ChangeLanguageEn()}
              >
                En
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="homeheader.medical-background" />
              </div>
              <div className="title2">
                <FormattedMessage id="homeheader.health-care" />
              </div>
              <div className="search">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Tìm gói khám tổng quát..."
                />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="child-options">
                  <div className="child-content">
                    <div className="service service1"></div>
                    <div className="text-content">
                      <FormattedMessage id="homeheader.Specialized-examination" />
                    </div>
                  </div>
                  <div className="child-content">
                    <div className="service service2"></div>
                    <div className="text-content">
                      <FormattedMessage id="homeheader.Remote-examination" />
                    </div>
                  </div>
                  <div className="child-content">
                    <div className="service service3"></div>
                    <div className="text-content">
                      <FormattedMessage id="homeheader.General-examination" />
                    </div>
                  </div>
                  <div className="child-content">
                    <div className="service service4"></div>
                    <div className="text-content">
                      <FormattedMessage id="homeheader.Medical-test" />
                    </div>
                  </div>
                  <div className="child-content">
                    <div className="service service5"></div>
                    <div className="text-content">
                      <FormattedMessage id="homeheader.Mental-health" />
                    </div>
                  </div>
                  <div className="child-content">
                    <div className="service service6"></div>
                    <div className="text-content">
                      <FormattedMessage id="homeheader.Dental-examination" />
                    </div>
                  </div>
                  <div className="child-content">
                    <div className="service service7"></div>
                    <div className="text-content">
                      <FormattedMessage id="homeheader.Surgery-package" />
                    </div>
                  </div>
                  <div className="child-content">
                    <div className="service service8"></div>
                    <div className="text-content">
                      <FormattedMessage id="homeheader.Medical-products" />
                    </div>
                  </div>
                  <div className="child-content">
                    <div className="service service9"></div>
                    <div className="text-content">
                      <FormattedMessage id="homeheader.Business-Health" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
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
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
