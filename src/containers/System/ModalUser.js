import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      phonenumber: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT-CLEAR-DATA-MODAL", () => {
      this.setState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        address: "",
        phonenumber: "",
      });
    });
  }
  componentDidMount() {}
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstname",
      "lastname",
      "address",
      "phonenumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        alert("missing parameter : " + arrInput[i]);
        isValid = false;
        break;
      }
    }
    return isValid;
  };
  handleOnchangeInput = (e, id) => {
    this.setState({
      [id]: e.target.value,
    });
  };
  HandleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.createNewUser(this.state);
    }
  };
  toggle = () => {
    this.props.isOpenModelUser();
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isShowModal}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create new user
        </ModalHeader>
        <ModalBody>
          <div className="modal-input-container">
            <div className="input-container">
              <label>Usename </label>
              <input
                name="usename"
                type="text"
                onChange={(e) => this.handleOnchangeInput(e, "email")}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input
                name="password"
                type="password"
                onChange={(e) => this.handleOnchangeInput(e, "password")}
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <label>firstname </label>
              <input
                name="firstname"
                type="text"
                onChange={(e) => this.handleOnchangeInput(e, "firstname")}
                value={this.state.firstname}
              />
            </div>
            <div className="input-container">
              <label>lastname </label>
              <input
                name="lastname"
                type="text"
                onChange={(e) => this.handleOnchangeInput(e, "lastname")}
                value={this.state.lastname}
              />
            </div>
            <div className="input-container">
              <label>Address </label>
              <input
                name="address"
                type="text"
                onChange={(e) => this.handleOnchangeInput(e, "address")}
                value={this.state.address}
              />
            </div>
            <div className="input-container">
              <label>phonenumber </label>
              <input
                name="phonenumber"
                type="text"
                onChange={(e) => this.handleOnchangeInput(e, "phonenumber")}
                value={this.state.phonenumber}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.HandleAddNewUser();
            }}
            className="px-3"
          >
            Add new
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
