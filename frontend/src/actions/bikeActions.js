import axios from 'axios';
import {
  CREATE_BIKE_REQUEST,
  CREATE_BIKE_SUCCESS,
  CREATE_BIKE_FAIL,
} from '../constants/bikeContants';

export const createBike = (
  brand,
  model,
  nSerie,
  year,
  location,
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
      { brand, model, nSerie, location, year, postalCode },
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
