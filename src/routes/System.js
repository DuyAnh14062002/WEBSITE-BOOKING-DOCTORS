import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/UserRedux";
import DoctorManage from "../containers/System/DoctorManage";
import SpecialtyManage from "../containers/System/SpecialtyManage";
import ClinicManage from "../containers/System/ClinicManage";
import ManageBooking from "../containers/System/ManageBooking";

class System extends Component {
  render() {
    const { systemMenuPath } = this.props;
    return (
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/system/user-manage" component={UserManage} />
            <Route path="/system/user-redux" component={UserRedux} />
            <Route path="/system/manage-doctor" component={DoctorManage} />
            <Route path="/system/manage-clinic" component={ClinicManage} />
            <Route
              path="/system/manage-speciality"
              component={SpecialtyManage}
            />
            <Route path="/system/manage-booking" component={ManageBooking} />
            <Route
              component={() => {
                return <Redirect to={systemMenuPath} />;
              }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
