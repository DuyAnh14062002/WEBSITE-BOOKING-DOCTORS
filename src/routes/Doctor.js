import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import DoctorSchedule from "../containers/doctor/DoctorSchedule";
import ManageBooking from "../containers/System/ManageBooking";

class Doctor extends Component {
  render() {
    //const { systemMenuPath } = this.props;
    return (
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/doctor/manage-schedule" component={DoctorSchedule} />
            <Route path="/doctor/manage-booking" component={ManageBooking} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
