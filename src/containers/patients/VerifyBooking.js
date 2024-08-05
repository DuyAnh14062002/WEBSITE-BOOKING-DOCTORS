import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import { VerifyBookingApointMent } from "../../services/doctorService";
import "./VerifyBooking.scss";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyStatus: false,
      check: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {}
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await VerifyBookingApointMent({
        doctorId: doctorId,
        token: token,
      });
      if (res && res.data && res.data.infor && res.data.infor.errCode === 0) {
        this.setState({
          verifyStatus: true,
        });
      }
      this.setState({
        check: 1,
      });
    }
  }

  render() {
    let { verifyStatus, check } = this.state;
    return (
      <>
        <HomeHeader />
        {check === 1 ? (
          verifyStatus === true ? (
            <div className="container-verify">
              <div className="icon-verify">
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <div className="text-verify">
                Xác nhận thông tin đặt lịch thành công.Vui lòng đến phòng khám
                đúng giờ.
              </div>
            </div>
          ) : (
            <div className="container-verify">
              <div className="icon-verify-x">
                <i class="fa-solid fa-circle-xmark"></i>
              </div>
              <div className="text-verify">
                Lịch hẹn không tồn tại hoặc đã được xác nhận !
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gender: state.admin.gender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
