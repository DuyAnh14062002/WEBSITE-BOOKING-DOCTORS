import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usename: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnchangeUsename = (event) => {
    this.setState({
      usename: event.target.value,
    });
  };
  handleOnchangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    await handleLoginApi(this.state.usename, this.state.password)
      .then((res) => {
        if (res.data && res.data.userData.errCode === 0) {
          this.props.actionLoginSuccess(res.data.userData);
          this.setState({
            errMessage: "Login success",
          });
        } else {
          this.setState({
            errMessage: res.data.userData.errMessage,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="form-group col-12 login-input">
              <label>UserName: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your usename"
                value={this.state.usename}
                onChange={(event) => this.handleOnchangeUsename(event)}
              />
            </div>
            <div className="form-group col-12 login-input">
              <label>Password: </label>
              <div className="custom-password">
                <input
                  value={this.state.password}
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={(event) => this.handleOnchangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <i
                  className={
                    this.state.isShowPassword
                      ? "fa-solid fa-eye"
                      : "fa-solid fa-eye-slash"
                  }
                  onClick={() => this.handleShowHidePassword()}
                ></i>
              </div>
            </div>
            <div style={{ color: "red" }}>{this.state.errMessage}</div>
            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Log in
              </button>
            </div>
            <div className="col-12 forgot-password">Forgot your password?</div>
            <div className="col-12 other-login">Other sign in with: </div>
            <div className="col-12 social-login">
              <i className="fa-brands fa-facebook facebook"></i>
              <i className="fa-brands fa-google-plus-g google"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    actionLoginSuccess: (userInfo) =>
      dispatch(actions.actionLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
