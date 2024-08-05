import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Header from "../Header/Header";
import "./userManage.scss";
import {
  getAllUsers,
  createNewUserSevice,
  deleteUserSevice,
  editUserSevice,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isShowModal: false,
      isShowModalEdit: false,
      userEdit: {},
    };
  }

  componentDidMount() {
    this.getAllUserReact();
  }

  getAllUserReact = async () => {
    const response = await getAllUsers("All");
    if (response && response.data.errCode === 0) {
      this.setState({
        users: response.data.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isShowModal: true,
    });
  };

  isOpenModelUser = () => {
    this.setState({
      isShowModal: !this.state.isShowModal,
    });
  };
  isOpenModelEditUser = () => {
    this.setState({
      isShowModalEdit: !this.state.isShowModalEdit,
    });
  };
  createNewUser = async (data) => {
    const response = await createNewUserSevice(data);
    if (response && response.data.errCode !== 0) {
      alert(response.data.message);
    } else {
      await this.getAllUserReact();
      this.setState({
        isShowModal: false,
      });
      emitter.emit("EVENT-CLEAR-DATA-MODAL", { ID: "123456" });
    }
  };
  DeleteUser = async (id) => {
    try {
      let res = await deleteUserSevice(id);
      if (res.data.errCode !== 0) {
        alert(res.data.errMessage);
      } else {
        await this.getAllUserReact();
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUser = (user) => {
    this.setState({
      isShowModalEdit: true,
      userEdit: user,
    });
  };
  doEditUser = async (data) => {
    try {
      let res = await editUserSevice(data);
      if (res && res.data.errCode !== 0) {
        alert(res.data.errMessage);
      } else {
        await this.getAllUserReact();
        this.setState({
          isShowModalEdit: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const arrUsers = this.state.users;
    return (
      <>
        <Header />
        <div className="user-container">
          <ModalUser
            isShowModal={this.state.isShowModal}
            isOpenModelUser={this.isOpenModelUser}
            createNewUser={this.createNewUser}
          />
          {this.state.isShowModalEdit && (
            <ModalEditUser
              isShowModalEdit={this.state.isShowModalEdit}
              isOpenModelEditUser={this.isOpenModelEditUser}
              curentUser={this.state.userEdit}
              doEditUser={this.doEditUser}
            />
          )}
          <div className="title text-center">MANAGE USERS</div>
          <div className="mx-1">
            <button
              className="btn btn-primary px-3"
              onClick={() => this.handleAddNewUser()}
            >
              <i className="fa-solid fa-plus"></i> Add new user
            </button>
          </div>
          <div className="users-table">
            <table id="customers">
              <tbody>
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
                {arrUsers &&
                  arrUsers.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.address}</td>
                        <td>{user.phoneNumber}</td>
                        <td>
                          <button
                            className="btn-update"
                            onClick={() => this.handleEditUser(user)}
                          >
                            <i className="fas fa-pen"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.DeleteUser(user.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
