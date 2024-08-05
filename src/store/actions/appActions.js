import actionTypes from "./actionTypes";
import { getTopDoctorService } from "./../../services/doctorService";
export const appStartUpComplete = () => ({
  type: actionTypes.APP_START_UP_COMPLETE,
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
  type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
  contentOfConfirmModal: contentOfConfirmModal,
});
export const getTopDocTorAction = (limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorService(limit);
      if (res && res.data) {
        dispatch({
          type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
          data: res.data.data.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_TOP_DOCTOR_FAILD,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TOP_DOCTOR_FAILD,
      });
    }
  };
};
