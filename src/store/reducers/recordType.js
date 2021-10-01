import { createReducer } from '@reduxjs/toolkit';

import { requestSuccess, requestFail } from '../../utils/api';
import {
  GET_RECORD_TYPES_REQUEST,
  GET_RECORD_TYPE_REQUEST,
  CREATE_RECORD_TYPE_REQUEST,
  SET_RECORD_TYPE,
  UPDATE_RECORD_TYPE_REQUEST,
  DELETE_RECORD_TYPE_REQUEST,
} from '../types';

/**
 * Initial state
 */
const initialState = {
  recordTypes: [],
  recordType: null,
  status: 'INIT',
  error: null,
};

/**
 * Create reducers
 */
export default createReducer(initialState, {
  [requestSuccess(GET_RECORD_TYPES_REQUEST)]: (state, { payload }) => ({
    ...state,
    recordTypes: payload.recordTypes,
    status: requestSuccess(GET_RECORD_TYPES_REQUEST),
  }),

  [requestFail(GET_RECORD_TYPES_REQUEST)]: (state, { payload }) => ({
    ...state,
    recordTypes: [],
    error: payload,
    status: requestFail(GET_RECORD_TYPES_REQUEST),
  }),

  [requestSuccess(GET_RECORD_TYPE_REQUEST)]: (state, { payload }) => ({
    ...state,
    recordType: payload.recordType,
    status: requestSuccess(GET_RECORD_TYPE_REQUEST),
  }),

  [requestFail(GET_RECORD_TYPE_REQUEST)]: (state, { payload }) => ({
    ...state,
    recordType: null,
    error: payload,
    status: requestFail(GET_RECORD_TYPE_REQUEST),
  }),

  [requestSuccess(CREATE_RECORD_TYPE_REQUEST)]: (state, { payload }) => {
    state.recordTypes.push(payload.recordType);
    state.status = requestSuccess(CREATE_RECORD_TYPE_REQUEST);
  },

  [requestFail(CREATE_RECORD_TYPE_REQUEST)]: (state, { payload }) => ({
    ...state,
    error: payload,
    status: requestFail(CREATE_RECORD_TYPE_REQUEST),
  }),

  [requestSuccess(UPDATE_RECORD_TYPE_REQUEST)]: (state, { payload }) => {
    const recordTypeIndex = state.recordTypes
      .findIndex((recordType) => recordType.id === payload.recordType.id);
    state.recordTypes[recordTypeIndex] = payload.recordType;
    state.status = requestSuccess(UPDATE_RECORD_TYPE_REQUEST);
  },

  [requestFail(UPDATE_RECORD_TYPE_REQUEST)]: (state, { payload }) => ({
    ...state,
    error: payload,
    status: requestFail(UPDATE_RECORD_TYPE_REQUEST),
  }),

  [requestSuccess(DELETE_RECORD_TYPE_REQUEST)]: (state, { payload }) => {
    const recordTypeIndex = state.recordTypes
      .findIndex((container) => container.guid === payload.id);
    state.recordTypes.splice(recordTypeIndex, 1);
    state.status = requestSuccess(DELETE_RECORD_TYPE_REQUEST);
  },

  [requestFail(DELETE_RECORD_TYPE_REQUEST)]: (state, { payload }) => ({
    ...state,
    error: payload,
    status: requestFail(DELETE_RECORD_TYPE_REQUEST),
  }),

  [SET_RECORD_TYPE]: (state, { payload }) => ({
    ...state,
    recordType: payload,
    status: SET_RECORD_TYPE,
  }),
});
