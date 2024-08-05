import React, { Component } from "react";
import { connect } from "react-redux";
//import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="section section-about">
        <div className="section-about-header">
          <h2>Truyền thông nói về DocTor Care</h2>
        </div>
        <div className="section-about-content">
          <div className="about-content-left">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="about-content-right">
            <p>
              DoctorCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện cung cấp
              nền tảng công nghệ giúp bệnh nhân dễ dàng lựa chọn dịch vụ y tế từ
              mạng lưới bác sĩ chuyên khoa giỏi, phòng khám/ bệnh viện uy tín
              với thông tin đã xác thực và đặt lịch nhanh chóng. Đội ngũ chúng
              tôi luôn nỗ lực hết mình, với mong muốn bệnh nhân yên tâm lựa chọn
              bác sĩ chuyên khoa giỏi cho vấn đề sức khỏe của mình. Để việc đặt
              lịch khám và đi khám của bệnh nhân trở nên đơn giản, thuận tiện
              nhất có thể.
            </p>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
