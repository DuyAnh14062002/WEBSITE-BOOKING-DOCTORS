import actionTypes from "../actions/actionTypes";

const initialState = {
  gender: [],
  position: [],
  role: [],
  isLoading: false,
  listUser: [],
  listDoctor: [],
  AllTimeSchedules: [],
  AllRequiredDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.gender = action.data;
      return {
        isLoading: false,
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILD:
      return {
        ...state,
        isLoading: false,
      };
    //reducer position
    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.position = action.data;
      return {
        isLoading: false,
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILD:
      return {
        ...state,
        isLoading: false,
      };
    //reducer role
    case actionTypes.FETCH_ROLE_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.role = action.data;
      return {
        isLoading: false,
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILD:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.FETCH_USER_SUCCESS:
      state.listUser = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_FAILD:
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      let indexDelete = state.listUser.findIndex((obj) => obj.id === action.id);
      state.listUser.slice(indexDelete, 1);
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_FAILD:
      return {
        ...state,
      };
    case actionTypes.GET_ALL_DOCTOR_SUCCESS:
      state.listDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_DOCTOR_FAILD:
      return {
        ...state,
      };
    case actionTypes.GET_ALLCODE_TIME_SUCCESS:
      state.AllTimeSchedules = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_ALLCODE_TIME_FAILD:
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      state.AllRequiredDoctorInfor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILD:
      state.AllRequiredDoctorInfor = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
