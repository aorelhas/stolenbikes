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
} from '../constants/bikeContants';

export const createBike = (
  brand,
  model,
  nSerie,
  year,
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
      { brand, model, nSerie, location, year, description, postalCode },
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
export const listBikes = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_BIKE_REQUEST });

    const { data } = await axios.get('/api/bikes');

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
