const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",

  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //load gender
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILD: "FETCH_GENDER_FAILD",

  //load position
  FETCH_POSITION_START: "FETCH_POSITION_START",
  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAILD: "FETCH_POSITION_FAILD",

  //load role
  FETCH_ROLE_START: "FETCH_ROLE_START",
  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILD: "FETCH_ROLE_FAILD",

  //CREATE USER
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAILD: "CREATE_USER_FAILD",

  //FETCH ALL USER
  FETCH_USER_SUCCESS: "FETCH_USER_SUCCESS",
  FETCH_USER_FAILD: "FETCH_USER_FAILD",

  //DELETE USER
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILD: "DELETE_USER_FAILD",

  //EDIT USER
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILD: "EDIT_USER_FAILD",

  //EDIT USER
  GET_TOP_DOCTOR_SUCCESS: "GET_TOP_DOCTOR_SUCCESS",
  GET_TOP_DOCTOR_FAILD: "GET_TOP_DOCTOR_FAILD",

  //GET ALL DOCTOR
  GET_ALL_DOCTOR_SUCCESS: "GET_ALL_DOCTOR_SUCCESS",
  GET_ALL_DOCTOR_FAILD: "GET_ALL_DOCTOR_FAILD",

  //Save info doctor
  SAVE_INFO_DOCTOR_SUCCESS: "SAVE_INFO_DOCTOR_SUCCESS",
  SAVE_INFO_DOCTOR_FAILD: "SAVE_INFO_DOCTOR_FAILD",

  // fetch allcode time
  GET_ALLCODE_TIME_SUCCESS: "GET_ALLCODE_TIME_SUCCESS",
  GET_ALLCODE_TIME_FAILD: "GET_ALLCODE_TIME_FAILD",

  FETCH_REQUIRED_DOCTOR_INFOR_START: "FETCH_REQUIRED_DOCTOR_INFOR_START",
  FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS: "FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS",
  FETCH_REQUIRED_DOCTOR_INFOR_FAILD: "FETCH_REQUIRED_DOCTOR_INFOR_FAILD",
});

export default actionTypes;
