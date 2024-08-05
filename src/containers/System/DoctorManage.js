import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorManage.scss";
import * as actions from "./../../store/actions/adminAction";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import Header from "../Header/Header";
import { getDetailDoctorById } from "./../../services/doctorService";
import { languages } from "./../../utils/constant";
import { FormattedMessage } from "react-intl";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      contentHTML: "",
      contentMarkDown: "",
      description: "",
      doctorId: "",
      optionDoctor: [],
      checkMarkDown: false,

      //Save infor doctor
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listSpecialty: [],
      listClinic: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvice: "",
      selectedSpecialty: "",
      selectedClinic: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
    let doctor = await getDetailDoctorById(selectedOption.value);
    let { listPrice, listPayment, listProvince, listClinic, listSpecialty } =
      this.state;
    let selectPrice = "";
    let selectPayment = "";
    let selectProvince = "";
    let selectClinic = "";
    let selectSpecialty = "";
    if (
      doctor.data &&
      doctor.data.data &&
      doctor.data.data.MarkDown &&
      doctor.data.data.DoctorInforData
    ) {
      selectProvince = listProvince.find((item) => {
        return (
          item && item.value === doctor.data.data.DoctorInforData.provinceId
        );
      });
      selectPayment = listPayment.find((item) => {
        return (
          item && item.value === doctor.data.data.DoctorInforData.paymentId
        );
      });
      selectPrice = listPrice.find((item) => {
        return item && item.value === doctor.data.data.DoctorInforData.priceId;
      });
      selectClinic = listClinic.find((item) => {
        return item && item.value === doctor.data.data.DoctorInforData.clinicId;
      });
      selectSpecialty = listSpecialty.find((item) => {
        return (
          item && item.value === doctor.data.data.DoctorInforData.specialtyId
        );
      });
      this.setState({
        description: doctor.data.data.MarkDown.description,
        contentHTML: doctor.data.data.MarkDown.contentHTML,
        contentMarkDown: doctor.data.data.MarkDown.contentMarkDown,
        selectedPrice: selectPrice,
        selectedPayment: selectPayment,
        selectedProvice: selectProvince,
        selectedClinic: selectClinic,
        selectedSpecialty: selectSpecialty,
        nameClinic: doctor.data.data.DoctorInforData.nameClinic,
        addressClinic: doctor.data.data.DoctorInforData.addressClinic,
        note: doctor.data.data.DoctorInforData.note,
        checkMarkDown: true,
      });
    } else {
      this.setState({
        description: "",
        contentHTML: "",
        contentMarkDown: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvice: "",
        nameClinic: "",
        addressClinic: "",
        note: "",
        checkMarkDown: false,
      });
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkDown: text,
    });
  };
  componentDidMount() {
    this.props.getAllDoctor();
    this.props.getAllRequiredDoctorInfor();
  }
  BuildDataInputSelect = (inputdata) => {
    let result = [];
    if (inputdata && inputdata.length > 0) {
      inputdata.map((item, index) => {
        let object = {};
        object.value = item.id;
        object.label = `${item.lastName} ${item.firstName}`;
        result.push(object);
      });
    }
    return result;
  };
  BuildDataInputSelectInfo = (inputdata) => {
    let result = [];
    let { language } = this.props;
    if (inputdata && inputdata.length > 0) {
      inputdata.map((item, index) => {
        let object = {};
        object.value = item.keyMap;
        object.label = languages.VI === language ? item.valueVi : item.valueEn;
        result.push(object);
      });
    }
    return result;
  };
  BuildDataInputSelectSpecialty = (inputdata) => {
    console.log("inputData : ", inputdata);
    let result = [];
    if (inputdata && inputdata.length > 0) {
      inputdata.map((item, index) => {
        let object = {};
        object.value = item.id;
        object.label = item.name;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listDoctors !== this.props.listDoctors) {
      let dataSelect = this.BuildDataInputSelect(this.props.listDoctors);
      this.setState({
        optionDoctor: dataSelect,
      });
    }

    if (
      prevProps.AllRequiredDoctorInfor !== this.props.AllRequiredDoctorInfor ||
      prevProps.language !== this.props.language
    ) {
      let { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
        this.props.AllRequiredDoctorInfor;

      let listPrices = this.BuildDataInputSelectInfo(resPrice);
      let listPayments = this.BuildDataInputSelectInfo(resPayment);
      let listProvinces = this.BuildDataInputSelectInfo(resProvince);
      let listSpecialty = this.BuildDataInputSelectSpecialty(resSpecialty);
      let listClinic = this.BuildDataInputSelectSpecialty(resClinic);
      this.setState({
        listPrice: listPrices,
        listPayment: listPayments,
        listProvince: listProvinces,
        listSpecialty: listSpecialty,
        listClinic: listClinic,
      });
    }
  }
  handleSaveInFoDoctor = () => {
    this.props.saveDoctorInfo({
      contentHTML: this.state.contentHTML,
      contentMarkDown: this.state.contentMarkDown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      checkMarkDown: this.state.checkMarkDown,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvice: this.state.selectedProvice.value,
      selectedSpecialty: this.state.selectedSpecialty.value,
      selectedClinic: this.state.selectedClinic.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };
  handleOnchaneTextarea = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  handleChangeSelect = (selectedOption, name) => {
    let copyState = { ...this.state };
    copyState[name] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  handleChangeText = (e, name) => {
    let copyState = { ...this.state };
    copyState[name] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  render() {
    return (
      <>
        <Header />
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <FormattedMessage id="doctor.update-infor" />
          </div>
          <div className="top-info">
            <div className="left-info">
              <label>
                <FormattedMessage id="doctor.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.optionDoctor}
              />
            </div>
            <div className="right-info form-group">
              <label>
                <FormattedMessage id="doctor.introduce-doctor" />
              </label>
              <textarea
                rows={6}
                className="form-control"
                onChange={(e) => this.handleOnchaneTextarea(e)}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="more-info-extra row">
            <div className="col-4 form-group mb-5 mt-5">
              <label>
                <FormattedMessage id="doctor.choose-price" />
              </label>
              <Select
                options={this.state.listPrice}
                value={this.state.selectedPrice}
                onChange={(e) => this.handleChangeSelect(e, "selectedPrice")}
              />
            </div>
            <div className="col-4 form-group mb-5 mt-5">
              <label>
                <FormattedMessage id="doctor.choose-payment" />
              </label>
              <Select
                options={this.state.listPayment}
                value={this.state.selectedPayment}
                onChange={(e) => this.handleChangeSelect(e, "selectedPayment")}
              />
            </div>
            <div className="col-4 form-group mb-5 mt-5">
              <label>
                <FormattedMessage id="doctor.choose-province" />
              </label>
              <Select
                options={this.state.listProvince}
                value={this.state.selectedProvice}
                onChange={(e) => this.handleChangeSelect(e, "selectedProvice")}
              />
            </div>
            <div className="col-4 form-group mb-5">
              <label>
                <FormattedMessage id="doctor.name-clinic" />
              </label>
              <input
                className="form-control"
                onChange={(e) => this.handleChangeText(e, "nameClinic")}
                value={this.state.nameClinic}
              />
            </div>
            <div className="col-4 form-group mb-5">
              <label>
                <FormattedMessage id="doctor.address-clinic" />
              </label>
              <input
                className="form-control"
                onChange={(e) => this.handleChangeText(e, "addressClinic")}
                value={this.state.addressClinic}
              />
            </div>
            <div className="col-4 form-group mb-5">
              <label>
                <FormattedMessage id="doctor.note" />
              </label>
              <input
                className="form-control"
                onChange={(e) => this.handleChangeText(e, "note")}
                value={this.state.note}
              />
            </div>
            <div className="col-4 form-group mb-5">
              <label>
                <FormattedMessage id="doctor.choose-specialty" />
              </label>
              <Select
                options={this.state.listSpecialty}
                value={this.state.selectedSpecialty}
                onChange={(e) =>
                  this.handleChangeSelect(e, "selectedSpecialty")
                }
              />
            </div>
            <div className="col-4 form-group mb-5">
              <label>
                <FormattedMessage id="doctor.choose-clinic" />
              </label>
              <Select
                options={this.state.listClinic}
                value={this.state.selectedClinic}
                onChange={(e) => this.handleChangeSelect(e, "selectedClinic")}
              />
            </div>
          </div>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkDown}
          />
          <button
            className="save-info-doctor"
            onClick={this.handleSaveInFoDoctor}
          >
            {this.state.checkMarkDown === true
              ? "Cập nhật thông tin"
              : "Thêm thông tin"}
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrUsers: state.admin.listUser,
    listDoctors: state.admin.listDoctor,
    AllRequiredDoctorInfor: state.admin.AllRequiredDoctorInfor,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(actions.DeleteUserAction(id)),
    getAllDoctor: () => dispatch(actions.getAllDocTorAction()),
    saveDoctorInfo: (inputData) =>
      dispatch(actions.saveInfoDoctorAction(inputData)),
    getAllRequiredDoctorInfor: () =>
      dispatch(actions.getAllRequiredDoctorInforAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
