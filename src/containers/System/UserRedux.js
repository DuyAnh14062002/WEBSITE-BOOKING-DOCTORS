import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
//import { getAllCodeSevice } from "../../services/userService";
import { languages, crudActions, CommonUtils } from "./../../utils";
import * as actions from "./../../store/actions/adminAction";
import Lightbox from "yet-another-react-lightbox";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser";
//import { add } from "lodash";
import Header from "../Header/Header";
class ProductManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewUrl: "",
      isOpenPreviewImage: false,

      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      phonenumber: "",
      gender: "",
      image: "",
      roleId: "",
      positionId: "",
      id: "",
      action: "ADD",
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
    this.props.getpositionStart();
    this.props.getAllUser("All");
  }
  async componentDidUpdate(prevProps, prevState) {}
  handleOnchangeInputImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewUrl: objectUrl,
        image: base64,
      });
    }
  };
  OpenPreviewImage = () => {
    this.setState({
      isOpenPreviewImage: true,
    });
  };
  handleOnchangeInput = (e, id) => {
    let copyState = this.state;
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let arrInput = [
      "email",
      "password",
      "firstname",
      "lastname",
      "phonenumber",
      "address",
    ];
    let check = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        check = false;
        alert("missing parameter input : " + arrInput[i]);
        break;
      }
    }
    return check;
  };
  SaveNewUser = () => {
    let check = this.checkValidateInput();
    const {
      email,
      password,
      firstname,
      lastname,
      address,
      phonenumber,
      gender,
      roleId,
      positionId,
      image,
      id,
    } = this.state;
    if (check === true && this.state.action === crudActions.ADD) {
      this.props.createUser({
        email,
        password,
        firstname,
        lastname,
        address,
        phonenumber,
        gender,
        roleId,
        positionId,
        image,
      });
    } else {
      this.props.editUser({
        firstname,
        lastname,
        address,
        phonenumber,
        gender,
        roleId,
        positionId,
        image,
        id,
      });
    }
    this.setState({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      phonenumber: "",
      gender: "M",
      image: "",
      roleId: "R1",
      positionId: "P0",
      id: "",
      action: crudActions.ADD,
      previewUrl: "",
    });
  };
  handleGetUserEdit = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstname: user.firstName,
      lastname: user.lastName,
      address: user.address,
      phonenumber: user.phoneNumber,
      gender: user.gender,
      image: imageBase64,
      previewUrl: imageBase64,
      roleId: user.roleId,
      positionId: user.positionId,
      id: user.id,
      action: crudActions.EDIT,
    });
  };
  render() {
    const { language } = this.props;
    const { Genders } = this.props;
    const { Positions } = this.props;
    const { Roles } = this.props;
    const {
      email,
      password,
      firstname,
      lastname,
      address,
      phonenumber,
      gender,
      roleId,
      positionId,
      // action,
      // previewUrl,
    } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div
          className="text-center text-primary mt-2"
          style={{ fontSize: "30px" }}
        >
          Manage User redux
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <h4 className="my-3">
                <FormattedMessage id="user.add" />
              </h4>
              <div className="form-group col-3 my-2 input-email">
                <lable>
                  <FormattedMessage id="user.email" />
                </lable>
                <input
                  className="form-control my-2 "
                  value={email}
                  onChange={(e) => this.handleOnchangeInput(e, "email")}
                  disabled={
                    this.state.action === crudActions.EDIT ? true : false
                  }
                ></input>
              </div>
              <div className="form-group col-3 my-2">
                <lable>
                  <FormattedMessage id="user.password" />
                </lable>
                <input
                  className="form-control"
                  value={password}
                  type="password"
                  disabled={
                    this.state.action === crudActions.EDIT ? true : false
                  }
                  onChange={(e) => this.handleOnchangeInput(e, "password")}
                ></input>
              </div>
              <div className="form-group col-3 my-2">
                <lable>
                  <FormattedMessage id="user.firstName" />
                </lable>
                <input
                  className="form-control"
                  value={firstname}
                  onChange={(e) => this.handleOnchangeInput(e, "firstname")}
                ></input>
              </div>
              <div className="form-group col-3 my-2">
                <lable>
                  <FormattedMessage id="user.LastName" />
                </lable>
                <input
                  className="form-control"
                  value={lastname}
                  onChange={(e) => this.handleOnchangeInput(e, "lastname")}
                ></input>
              </div>
              <div className="form-group col-3">
                <lable>
                  <FormattedMessage id="user.phone" />
                </lable>
                <input
                  className="form-control"
                  value={phonenumber}
                  onChange={(e) => this.handleOnchangeInput(e, "phonenumber")}
                ></input>
              </div>
              <div className="form-group col-9 my-2">
                <lable>
                  <FormattedMessage id="user.address" />
                </lable>
                <input
                  className="form-control"
                  value={address}
                  onChange={(e) => this.handleOnchangeInput(e, "address")}
                ></input>
              </div>
              <div className="form-group col-3 my-2">
                <label>
                  <FormattedMessage id="user.gender" />
                </label>
                <select
                  className="col-12 form-control"
                  value={gender}
                  onChange={(e) => this.handleOnchangeInput(e, "gender")}
                >
                  {Genders &&
                    Genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === languages.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-3 my-2">
                <lable>
                  <FormattedMessage id="user.role" />
                </lable>
                <select
                  className="col-12 form-control"
                  value={roleId}
                  onChange={(e) => this.handleOnchangeInput(e, "roleId")}
                >
                  {Roles &&
                    Roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === languages.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-3 my-2">
                <lable>
                  <FormattedMessage id="user.position" />
                </lable>
                <select
                  className="col-12 form-control"
                  value={positionId}
                  onChange={(e) => this.handleOnchangeInput(e, "positionId")}
                >
                  {Positions &&
                    Positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === languages.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-3 my-2">
                <lable>
                  <FormattedMessage id="user.image" />
                </lable>
                <div className="upload-image-container">
                  <input
                    type="file"
                    id="uploadImage"
                    hidden
                    onChange={(event) => this.handleOnchangeInputImage(event)}
                  ></input>
                  <label htmlFor="uploadImage">
                    Tải ảnh <i className="fa-solid fa-upload"></i>
                  </label>
                </div>
                <div
                  className="previewImage"
                  style={{
                    backgroundImage: `url("${this.state.previewUrl}")`,
                  }}
                  onClick={() => this.OpenPreviewImage()}
                ></div>
              </div>
              <div className="col-3">
                <button
                  type="button"
                  className={
                    this.state.action === crudActions.ADD
                      ? "btn btn-primary"
                      : "btn btn-warning"
                  }
                  style={{ padding: "0px 10px 5px 10px" }}
                  onClick={() => this.SaveNewUser()}
                >
                  <FormattedMessage
                    id={
                      this.state.action === crudActions.ADD
                        ? "user.save"
                        : "user.edit"
                    }
                  />
                </button>
              </div>
              <div className="col-12">
                <TableManageUser handleGetUserEdit={this.handleGetUserEdit} />
              </div>
            </div>
          </div>
        </div>
        <Lightbox
          open={this.state.isOpenPreviewImage}
          close={() => {
            this.setState({
              isOpenPreviewImage: false,
            });
          }}
          slides={[{ src: `${this.state.previewUrl}` }]}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    Genders: state.admin.gender,
    Roles: state.admin.role,
    Positions: state.admin.position,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getpositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createUser: (data) => dispatch(actions.CreateUserAction(data)),
    getAllUser: (id) => dispatch(actions.FetchUserAction(id)),
    editUser: (user) => dispatch(actions.EditUserAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
