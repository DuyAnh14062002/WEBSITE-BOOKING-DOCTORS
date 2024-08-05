import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "./ClinicManage.scss";
import { createClinic } from "../../services/clinicService";
import { CommonUtils } from "../../utils";
import { toast } from "react-toastify";
import Header from "../Header/Header";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ClinicManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionMARKDOWN: "",
      descriptionHTML: "",
      previewUrl: "",
    };
  }
  handleOnchangeText = (e, name) => {
    this.setState({
      [name]: e.target.value,
    });
  };
  handleOnchangeInputImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewUrl: objectUrl,
        imageBase64: base64,
      });
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMARKDOWN: text,
    });
  };
  saveClinic = async () => {
    let res = await createClinic({
      name: this.state.name,
      imageBase64: this.state.imageBase64,
      address: this.state.address,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMARKDOWN: this.state.descriptionMARKDOWN,
    });
    if (res && res.data && res.data.infor && res.data.infor.errCode === 0) {
      toast.success("Tạo phòng khám thành công !!");
    } else {
      toast.error("Tạo phòng khám thất bại");
    }
  };
  render() {
    return (
      <>
        <Header />
        <div className="container">
          <h2 className="text-center Specialty-title">Quản lí phòng khám</h2>
          <div className="row">
            <div className="col-6 mt-3 form-group">
              <label>Tên phòng khám</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleOnchangeText(e, "name")}
              />
            </div>
            <div className="col-6 mt-3 form-group">
              <label>Ảnh phòng khám</label>
              <input
                type="file"
                placeholder="Tải ảnh"
                className="ml-5"
                onChange={(event) => this.handleOnchangeInputImage(event)}
              />
            </div>
            <div className="col-6 mt-3 form-group">
              <label>Địa chỉ phòng khám</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleOnchangeText(e, "address")}
              />
            </div>
            <div className="col-12 mt-3">
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMARKDOWN}
              />
            </div>
          </div>
          <button
            className="btn btn-primary mt-3 btn-save"
            onClick={this.saveClinic}
          >
            Lưu thông tin
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
