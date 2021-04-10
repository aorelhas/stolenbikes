import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants';
import axios from 'axios';

export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
  } catch (error) {}
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};
