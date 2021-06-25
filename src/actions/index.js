import streamsApi from '../apis/streams';
import {
  SIGN_OUT,
  SIGN_IN,
  GET_STREAMS,
  CREATE_STREAM,
  GET_SINGLE_STREAM,
  UPDATE_STREAM,
  DELETE_STREAM,
} from './types';
import history from '../history';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const getStreams = () => async (dispatch) => {
  const response = await streamsApi.get();
  dispatch({ type: GET_STREAMS, payload: response.data });
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().userAuth;
  const response = await streamsApi.post('', { ...formValues, userId });
  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/');
};

export const getSingleStream = (id) => async (dispatch) => {
  const response = await streamsApi.get(`/${id}`);
  dispatch({ type: GET_SINGLE_STREAM, payload: response.data });
};

export const updateStream = (id, formValues) => async (dispatch) => {
  const response = await streamsApi.patch(`/${id}`, formValues);
  dispatch({ type: UPDATE_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
  await streamsApi.delete(`/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
