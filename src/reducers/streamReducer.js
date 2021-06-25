import { GET_STREAMS } from '../actions/types';
import { GET_SINGLE_STREAM } from '../actions/types';
import { CREATE_STREAM } from '../actions/types';
import { UPDATE_STREAM } from '../actions/types';
import { DELETE_STREAM } from '../actions/types';

const arrToObjWithKey = (arr, key) => {
  const obj = {};
  Object.values(arr).forEach((item) => {
    if (!item[key]) {
      throw Error(`arrToObjWithKey function requires every item to have "${key}" property`);
    }
    const keyInObj = item[key];
    obj[keyInObj] = item;
  });
  return obj;
};

const removeFromObj = (obj, prop) => {
  /*WARNING only shallow copy*/
  const shallowCopy = { ...obj };
  delete shallowCopy[prop];
  return shallowCopy;
};

export const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STREAMS:
      return arrToObjWithKey(action.payload, 'id');

    case GET_SINGLE_STREAM:
    case CREATE_STREAM:
    case UPDATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_STREAM:
      return removeFromObj(state, action.payload);

    default:
      return state;
  }
};
