import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { requestSuccess, requestFail } from '../../utils/api';
import {
  GET_RECORDS_REQUEST,
  GET_RECORD_REQUEST,
  CREATE_RECORD_REQUEST,
  UPDATE_RECORD_REQUEST,
  SET_RECORD,
} from '../types';

/**
 * Initial state
 */
const initialState = {
  records: [],
  record: null,
  status: 'INIT',
  error: null,
};

/**
 * Create reducers
 */
export default createReducer(initialState, {
  [requestSuccess(GET_RECORDS_REQUEST)]: (state, { payload }) => ({
    ...state,
    records: payload.records,
    status: requestSuccess(GET_RECORDS_REQUEST),
  }),

  [requestFail(GET_RECORDS_REQUEST)]: (state, { payload }) => ({
    ...state,
    records: [],
    error: payload,
    status: requestFail(GET_RECORDS_REQUEST),
  }),

  [requestSuccess(GET_RECORD_REQUEST)]: (state, { payload }) => ({
    ...state,
    record: payload.record,
    status: requestSuccess(GET_RECORD_REQUEST),
  }),

  [requestFail(GET_RECORD_REQUEST)]: (state, { payload }) => ({
    ...state,
    record: null,
    error: payload,
    status: requestFail(GET_RECORD_REQUEST),
  }),

  [requestSuccess(CREATE_RECORD_REQUEST)]: (state, { payload }) => {
    const guid = uuidv4();
    const record = Object.assign({}, { guid }, { ...payload.record });
    state.records.push(record);
    state.status = requestSuccess(CREATE_RECORD_REQUEST);
  },

  [requestFail(CREATE_RECORD_REQUEST)]: (state, { payload }) => ({
    ...state,
    record: null,
    error: payload,
    status: requestFail(CREATE_RECORD_REQUEST),
  }),

  [requestSuccess(UPDATE_RECORD_REQUEST)]: (state, { payload }) => {
    const { guid, record } = payload;
    const recordIndex = state.records.findIndex((rec) => rec.guid === guid);
    state.record = record;
    state.records[recordIndex] = { ...state.records[recordIndex], ...record };
    state.status = requestSuccess(UPDATE_RECORD_REQUEST);
  },

  [requestFail(UPDATE_RECORD_REQUEST)]: (state, { payload }) => ({
    ...state,
    record: null,
    error: payload,
    status: requestFail(UPDATE_RECORD_REQUEST),
  }),

  [SET_RECORD]: (state, { payload }) => {
    const { record } = payload;
    state.record = record;
    state.status = SET_RECORD;
  },
});
