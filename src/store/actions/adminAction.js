import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCodeSevice,
  createNewUserSevice,
  getAllUsers,
  deleteUserSevice,
  editUserSevice,
} from "./../../services/userService";
import {
  getAllDoctorService,
  saveInfoDoctorSevice,
} from "./../../services/doctorService";
import { getAllSpecialty } from "../../services/specialtySevice";
import { getAllClinic } from "../../services/clinicService";
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeSevice("GENDER");
      if (res && res.data && res.data.data) {
        dispatch(fetchGenderSuccess(res.data.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log(e);
    }
  };
};

export const fetchGenderSuccess = (data) => {
  return {
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data,
  };
};

export const fetchGenderFail = (data) => {
  return {
    type: actionTypes.FETCH_GENDER_FAILD,
    data,
  };
};

//action position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      let res = await getAllCodeSevice("POSITION");
      if (res && res.data.data) {
        dispatch(fetchPositionSuccess(res.data.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log(e);
    }
  };
};

export const fetchPositionSuccess = (data) => {
  return {
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data,
  };
};

export const fetchPositionFail = (data) => {
  return {
    type: actionTypes.FETCH_POSITION_FAILD,
    data,
  };
};

//action role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      let res = await getAllCodeSevice("ROLE");
      if (res && res.data.data) {
        dispatch(fetchRoleSuccess(res.data.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log(e);
    }
  };
};

export const fetchRoleSuccess = (data) => {
  return {
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data,
  };
};
export const fetchRoleFail = (data) => {
  return {
    type: actionTypes.FETCH_ROLE_FAILD,
    data,
  };
};

export const CreateUserAction = (userData) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserSevice(userData);
      if (res && res.data) {
        toast.success("Create User Success!!!");
        dispatch(CreateUserSuccess());
        dispatch(FetchUserAction("All"));
      } else {
        dispatch(CreateUserFail());
      }
    } catch (e) {
      toast.error("Can not create user !!!");
      dispatch(CreateUserFail());
      console.log(e);
    }
  };
};

export const CreateUserSuccess = () => {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
  };
};
export const CreateUserFail = () => {
  return {
    type: actionTypes.CREATE_USER_FAILD,
  };
};

export const FetchUserAction = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers(id);
      if (res && res.data) {
        dispatch(FetchUserSuccess(res.data.users));
      } else {
        dispatch(FetchUserFaild());
      }
    } catch (e) {
      dispatch(FetchUserFaild());
      console.log(e);
    }
  };
};

export const FetchUserSuccess = (data) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    data,
  };
};

export const FetchUserFaild = () => {
  return {
    type: actionTypes.FETCH_USER_FAILD,
  };
};

export const DeleteUserAction = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserSevice(id);
      if (res && res.data) {
        dispatch(DeleteUserSuccess(id));
        dispatch(FetchUserAction("All"));
        toast.success("Delete User Success!!!");
      } else {
        dispatch(DeleteUserFaild());
        toast.error("Delete User Faild!!!");
      }
    } catch (e) {
      dispatch(DeleteUserFaild());
      toast.error("Delete User Faild!!!");
      console.log(e);
    }
  };
};

export const DeleteUserSuccess = (id) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    data: id,
  };
};

export const DeleteUserFaild = () => {
  return {
    type: actionTypes.DELETE_USER_FAILD,
  };
};

export const EditUserAction = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserSevice(user);
      if (res && res.data) {
        dispatch(EditUserSuccess());
        dispatch(FetchUserAction("All"));
        toast.success("Edit User Success!!!");
      } else {
        dispatch(EditUserFaild());
        toast.error("Edit User Faild!!!");
      }
    } catch (e) {
      dispatch(EditUserFaild());
      toast.error("Edit User Faild!!!");
      console.log(e);
    }
  };
};

export const EditUserSuccess = () => {
  return {
    type: actionTypes.EDIT_USER_SUCCESS,
  };
};

export const EditUserFaild = () => {
  return {
    type: actionTypes.EDIT_USER_FAILD,
  };
};

export const getAllDocTorAction = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorService();
      if (res && res.data) {
        dispatch({
          type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
          data: res.data.data.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_ALL_DOCTOR_FAILD,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_ALL_DOCTOR_FAILD,
      });
    }
  };
};

export const saveInfoDoctorAction = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveInfoDoctorSevice(data);
      if (res) {
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
        });
        if (data.checkMarkDown === true) {
          toast.success("Upadate info doctor Success!!!");
        } else {
          toast.success("Create info doctor Success!!!");
        }
      } else {
        dispatch({
          type: actionTypes.SAVE_INFO_DOCTOR_FAILD,
        });
        if (data.checkMarkDown === true) {
          toast.error("Update info doctor Faild !!! ");
        } else {
          toast.error("Create info doctor Faild !!! ");
        }
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.SAVE_INFO_DOCTOR_FAILD,
      });
      if (data.checkMarkDown === true) {
        toast.error("Update info doctor Faild !!! ");
      } else {
        toast.error("Create info doctor Faild !!! ");
      }
    }
  };
};

export const getAllCodeTimeAction = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeSevice("TIME");
      if (res && res.data && res.data.data) {
        dispatch({
          type: actionTypes.GET_ALLCODE_TIME_SUCCESS,
          data: res.data.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_ALLCODE_TIME_FAILD,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_ALLCODE_TIME_FAILD,
      });
    }
  };
};

export const getAllRequiredDoctorInforAction = () => {
  return async (dispatch, getState) => {
    try {
      let resPrice = await getAllCodeSevice("PRICE");
      let resProvince = await getAllCodeSevice("PROVINCE");
      let resPayment = await getAllCodeSevice("PAYMENT");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      console.log("resSpecialtyAction : ", resSpecialty);
      let data = {
        resPrice: resPrice.data.data,
        resPayment: resPayment.data.data,
        resProvince: resProvince.data.data,
        resSpecialty: resSpecialty.data.infor.data,
        resClinic: resClinic.data.infor.data,
      };
      if (
        resPrice &&
        resPrice.data.data &&
        resPayment &&
        resPayment.data.data &&
        resProvince &&
        resProvince.data.data &&
        resSpecialty &&
        resSpecialty.data.infor &&
        resSpecialty.data.infor.data &&
        resClinic.data.infor &&
        resClinic.data.infor.data
      ) {
        dispatch({
          type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
          data: data,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILD,
      });
    }
  };
};
