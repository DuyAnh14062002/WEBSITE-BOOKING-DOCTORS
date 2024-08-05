import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { FormattedMessage } from "react-intl";
import { getExtraDoctorInforById } from "../../../services/doctorService";
import { languages } from "../../../utils/constant";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeltailPrice: false,
      selectedPrice: {},
      selectedPayment: {},
      selectedProvice: {},
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.doctorId !== prevProps.doctorId) {
      let res = await getExtraDoctorInforById(this.props.doctorId);
      if (
        res &&
        res.data &&
        res.data.data &&
        res.data.data.data &&
        res.data.data.errCode === 0
      ) {
        this.setState({
          selectedPrice: res.data.data.data.priceTypeData,
          selectedPayment: res.data.data.data.paymentTypeData,
          selectedProvice: res.data.data.data.provinceTypeData,
          nameClinic: res.data.data.data.nameClinic,
          addressClinic: res.data.data.data.addressClinic,
          note: res.data.data.data.note,
        });
      }
    }
  }
  async componentDidMount() {
    let res = await getExtraDoctorInforById(this.props.doctorId);
    if (
      res &&
      res.data &&
      res.data.data &&
      res.data.data.data &&
      res.data.data.errCode === 0
    ) {
      this.setState({
        selectedPrice: res.data.data.data.priceTypeData,
        selectedPayment: res.data.data.data.paymentTypeData,
        selectedProvice: res.data.data.data.provinceTypeData,
        nameClinic: res.data.data.data.nameClinic,
        addressClinic: res.data.data.data.addressClinic,
        note: res.data.data.data.note,
      });
    }
  }
  handleClickShowDetail = (checkShow) => {
    this.setState({
      isShowDeltailPrice: checkShow,
    });
  };
  render() {
    let {
      isShowDeltailPrice,
      selectedPrice,
      selectedPayment,
      nameClinic,
      addressClinic,
      note,
    } = this.state;
    let language = this.props.lang;
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="content-title">
            <FormattedMessage id="doctor.address-clinic" />:
          </div>
          <div className="content-name">{nameClinic}</div>
          <div className="content-address">{addressClinic}</div>
        </div>
        <div className="content-down">
          {isShowDeltailPrice === false && (
            <div className="show-up">
              <FormattedMessage id="doctor.price" /> :{" "}
              {languages.VI === language && `${selectedPrice.valueVi} VND`}
              {languages.EN === language && `${selectedPrice.valueEn} $`}
              <span
                className="open-detail"
                onClick={() => this.handleClickShowDetail(true)}
              >
                <FormattedMessage id="doctor.see-detail" />
              </span>
            </div>
          )}
          {isShowDeltailPrice === true && (
            <div className="show-down">
              <div className="show-down-box">
                <div className="show-down-price">
                  <span>
                    <FormattedMessage id="doctor.price" />
                  </span>
                  <span className="show-down-price-number">
                    {languages.VI === language &&
                      `${selectedPrice.valueVi} VND`}
                    {languages.EN === language && `${selectedPrice.valueEn} $`}
                  </span>
                </div>
                <div>{note}.</div>
              </div>
              <div className="infor-payment">
                Người bệnh có thể thanh toán chi phí bằng{" "}
                {languages.VI === language && `${selectedPayment.valueVi}`}
                {languages.EN === language && `${selectedPayment.valueEn}`}
              </div>
              <div
                className="close-detail"
                onClick={() => this.handleClickShowDetail(false)}
              >
                <FormattedMessage id="doctor.hide-detail" />
              </div>
            </div>
          )}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
