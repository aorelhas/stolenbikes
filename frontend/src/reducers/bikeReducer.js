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
  BIKE_DETAIL_RESET,
  CREATE_NEW_BIKE_RESET,
  MY_BIKE_REQUEST,
  MY_BIKE_SUCCESS,
  MY_BIKE_FAIL,
  MY_BIKE_UPDATE_REQUEST,
  MY_BIKE_UPDATE_SUCCESS,
  MY_BIKE_UPDATE_FAIL,
  MY_BIKE_DELETE_REQUEST,
  MY_BIKE_DELETE_SUCCESS,
  MY_BIKE_DELETE_FAIL,
  MY_BIKE_UPDATE_RESET,
  BIKE_TOP_REQUEST,
  BIKE_TOP_SUCCESS,
  BIKE_TOP_FAIL,
  BIKE_CREATE_COMMENT_REQUEST,
  BIKE_CREATE_COMMENT_SUCCESS,
  BIKE_CREATE_COMMENT_RESET,
  BIKE_CREATE_COMMENT_FAIL,
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
    case CREATE_NEW_BIKE_RESET:
      return {};
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
      return {
        loading: false,
        bikes: payload,
        pages: payload.pages,
        page: payload.page,
      };
    case LIST_BIKE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const bikeDetailReducer = (state = { bike: { posts: [] } }, action) => {
  const { type, payload } = action;

  switch (type) {
    case BIKE_DETAIL_REQUEST:
      return { ...state, loading: true };
    case BIKE_DETAIL_SUCCESS:
      return { loading: false, bike: payload };
    case BIKE_DETAIL_FAIL:
      return { loading: false, error: payload };
    case BIKE_DETAIL_RESET:
      return { bike: {} };
    default:
      return state;
  }
};

export const getMyBikesReducer = (state = { bikes: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case MY_BIKE_REQUEST:
      return { loading: true };
    case MY_BIKE_SUCCESS:
      return { loading: false, bikes: payload };
    case MY_BIKE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const bikeUpdateReducer = (state = { bike: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case MY_BIKE_UPDATE_REQUEST:
      return { loading: true };
    case MY_BIKE_UPDATE_SUCCESS:
      return { loading: false, success: true, bike: payload };
    case MY_BIKE_UPDATE_FAIL:
      return { loading: false, error: payload };
    case MY_BIKE_UPDATE_RESET:
      return { bike: {} };
    default:
      return state;
  }
};

export const bikeDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case MY_BIKE_DELETE_REQUEST:
      return { loading: true };
    case MY_BIKE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MY_BIKE_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const bikeTopReducer = (state = { bikes: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case BIKE_TOP_REQUEST:
      return { loading: true, bikes: [] };
    case BIKE_TOP_SUCCESS:
      return { loading: false, bikes: payload };
    case BIKE_TOP_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const bikeCommentCreateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case BIKE_CREATE_COMMENT_REQUEST:
      return { loading: true };
    case BIKE_CREATE_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case BIKE_CREATE_COMMENT_FAIL:
      return { loading: false, error: payload };
    case BIKE_CREATE_COMMENT_RESET:
      return { bike: {} };
    default:
      return state;
  }
};
