import {
  CREATE_BIKE_REQUEST,
  CREATE_BIKE_SUCCESS,
  CREATE_BIKE_FAIL,
  LIST_BIKE_REQUEST,
  LIST_BIKE_SUCCESS,
  LIST_BIKE_FAIL,
} from '../constants/bikeContants';

export const createBikeReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_BIKE_REQUEST:
      return { loading: true };
    case CREATE_BIKE_SUCCESS:
      return { loading: false, success: true, bikes: payload };
    case CREATE_BIKE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const listBikeReducer = (state = { bikes: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case LIST_BIKE_REQUEST:
      return { loading: true, bikes: [] };
    case LIST_BIKE_SUCCESS:
      return { loading: false, bikes: payload };
    case LIST_BIKE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
