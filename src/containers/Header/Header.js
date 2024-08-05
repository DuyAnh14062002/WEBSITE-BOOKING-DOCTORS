import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, DoctorMenu } from "./menuApp";
import "./Header.scss";
import { languages } from "../../utils/constant";
import { FormattedMessage } from "react-intl";
import { RoleUser } from "../../utils/constant";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      menu: [],
    };
  }
  handleChangeLanguage = (lang) => {
    this.props.actionChangeLanguage(lang);
  };
  componentDidMount() {
    let { userInfo } = this.props;
    if (userInfo && userInfo.user) {
      let role = userInfo.user.roleId;
      if (role === RoleUser.DOCTOR) {
        this.setState({
          menu: DoctorMenu,
        });
      }
      if (role === RoleUser.ADMIN) {
        this.setState({
          menu: adminMenu,
        });
      }
    }
  }
  render() {
    const { processLogout } = this.props;
    const { language, userInfo } = this.props;
    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <Navigator menus={this.state.menu} />
        </div>

        <div className="header-contain">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />
            <span>
              {userInfo && userInfo.user ? userInfo.user.firstName : ""} !
            </span>
          </span>
          <span
            className={languages.VI === language ? "Vi active" : "Vi"}
            onClick={() => this.handleChangeLanguage(languages.VI)}
          >
            Vn
          </span>
          <span
            className={languages.EN === language ? "En active" : "En"}
            onClick={() => this.handleChangeLanguage(languages.EN)}
          >
            En
          </span>
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    actionChangeLanguage: (lang) =>
      dispatch(actions.actionChangeLanguage(lang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
