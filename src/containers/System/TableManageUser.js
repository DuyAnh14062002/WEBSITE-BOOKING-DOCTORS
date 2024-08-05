import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "./../../store/actions/adminAction";

class TableManageUser extends Component {
  handleEditUser = (user) => {
    this.props.handleGetUserEdit(user);
  };
  DeleteUser = (id) => {
    this.props.deleteUser(id);
  };
  render() {
    let arrUsers = this.props.arrUsers;
    return (
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrUsers: state.admin.listUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(actions.DeleteUserAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
