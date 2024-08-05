import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingConfirmModal.scss";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";
import { CommonUtils } from "./../../utils";
import { ConFirmBooking } from "../../services/bookingService";
import { fill } from "lodash";
class BookingConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", image: "" };
  }
  handleonChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleHideModal = () => {
    this.props.handleHideModal();
  };
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
  handleConfirmBooking = async () => {
    let data = {
      email: this.state.email,
      doctorId: this.props.userInfo.user.id,
      patientId: this.props.patientId,
      timeType: this.props.timeType,
      namePatient: this.props.namePatient,
      imageBase64: this.state.image,
    };
    await ConFirmBooking(data);
    this.props.handleHideModal();
    toast.success("gửi đơn thuốc thành công !");
  };
  render() {
    console.log("props : ", this.props);
    return (
      <>
        <Modal
          isOpen={this.props.isShowModal}
          className={"modal-booking-container"}
          size="md"
          centered
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span>
                <FormattedMessage id="doctor.sent-invoice" />
              </span>
              <span
                className="btn-hide-modal"
                onClick={this.props.handleHideModal}
              >
                x
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="doctor.email-patient" />
                  </label>
                  <input
                    className="form-control"
                    onChange={(e) => this.handleonChangeInput(e, "email")}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="doctor.choose-file-medical" />
                  </label>
                  <input
                    className="form-control"
                    onChange={(e) => this.handleOnchangeInputImage(e, "file")}
                    type="file"
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn-confirm"
                onClick={() => this.handleConfirmBooking()}
              >
                <FormattedMessage id="doctor.confirm" />
              </button>
              <button
                className="btn-cancel"
                onClick={this.props.handleHideModal}
              >
                <FormattedMessage id="doctor.cancel" />
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gender: state.admin.gender,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingConfirmModal);
