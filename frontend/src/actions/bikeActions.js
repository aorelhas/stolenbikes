import axios from 'axios';
import {
  CREATE_BIKE_REQUEST,
  CREATE_BIKE_SUCCESS,
  CREATE_BIKE_FAIL,
  LIST_BIKE_REQUEST,
  LIST_BIKE_SUCCESS,
  LIST_BIKE_FAIL,
  BIKE_DETAIL_REQUEST,
  BIKE_DETAIL_SUCCESS,
  BIKE_DETAIL_FAIL,
  MY_BIKE_REQUEST,
  MY_BIKE_SUCCESS,
  MY_BIKE_FAIL,
  MY_BIKE_UPDATE_REQUEST,
  MY_BIKE_UPDATE_SUCCESS,
  MY_BIKE_UPDATE_FAIL,
  MY_BIKE_DELETE_REQUEST,
  MY_BIKE_DELETE_SUCCESS,
  MY_BIKE_DELETE_FAIL,
  BIKE_TOP_REQUEST,
  BIKE_TOP_SUCCESS,
  BIKE_TOP_FAIL,
  BIKE_CREATE_COMMENT_REQUEST,
  BIKE_CREATE_COMMENT_SUCCESS,
  BIKE_CREATE_COMMENT_FAIL,
} from '../constants/bikeContants';

export const createBike = (
  brand,
  model,
  nSerie,
  year,
  image,
  location,
  description,
  postalCode
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_BIKE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/bikes/add`,
      { brand, model, nSerie, image, location, year, description, postalCode },
      config
    );

    dispatch({
      type: CREATE_BIKE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_BIKE_FAIL,
      payload: message,
    });
  }
};

// Implement keyword search by nSerie
export const listBikes = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: LIST_BIKE_REQUEST });

    const { data } = await axios.get(`/api/bikes?keyword=${keyword}`);

    dispatch({
      type: LIST_BIKE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_BIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBikeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BIKE_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/bikes/${id}`);

    dispatch({
      type: BIKE_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BIKE_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyOwnBikes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_BIKE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/bikes/mybikes', config);

    dispatch({
      type: MY_BIKE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MY_BIKE_FAIL,
      payload: message,
    });
  }
};

export const bikeUpdate = (bike) => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_BIKE_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/bikes/${bike._id}`, bike, config);

    dispatch({ type: MY_BIKE_UPDATE_SUCCESS, payload: data });
    // dispatch({ type: MY_BIKE_UPDATE_SUCCESS });
    // dispatch({ type: BIKE_DETAIL_SUCCESS, payload: data });
    // dispatch({ type: BIKE_DETAIL_RESET });
  } catch (error) {
    const message =
      error.message && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MY_BIKE_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteBike = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_BIKE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/bikes/${id}`, config);

    dispatch({ type: MY_BIKE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.message && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MY_BIKE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const bikeTop = () => async (dispatch) => {
  try {
    dispatch({ type: BIKE_TOP_REQUEST });

    const { data } = await axios.get('/api/bikes/top');

    dispatch({
      type: BIKE_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BIKE_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBikeComment = (bikeId, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: BIKE_CREATE_COMMENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/bikes/${bikeId}/comments`, comment, config);

    dispatch({ type: BIKE_CREATE_COMMENT_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BIKE_CREATE_COMMENT_FAIL,
      payload: message,
    });
  }
};
