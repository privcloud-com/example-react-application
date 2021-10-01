import axios from 'axios';

import recordService from '../../services/recordService';
import containerService from '../../services/containerService';
import { requestFail, requestPending, requestSuccess } from '../../utils/api';
import {
  GET_RECORDS_REQUEST,
  GET_RECORD_REQUEST,
  SET_RECORD,
  CREATE_RECORD_REQUEST,
  UPDATE_RECORD_REQUEST,
} from '../types';

export function getRecordsFromAPI(guid) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_RECORDS_REQUEST) });

      const records = await containerService.listRecordsContainer(guid)

      dispatch({
        type: requestSuccess(GET_RECORDS_REQUEST),
        payload: { records },
      });
    } catch (error) {
      dispatch({
        type: requestFail(GET_RECORDS_REQUEST),
        payload: error,
      });
    }
  };
}

export function getRecordsFromJSON() {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_RECORDS_REQUEST) });

      const response = await axios.get('/assets/json/records.json');

      dispatch({
        type: requestSuccess(GET_RECORDS_REQUEST),
        payload: { records: response.data },
      });
    } catch (error) {
      dispatch({
        type: requestFail(GET_RECORDS_REQUEST),
        payload: error,
      });
    }
  };
}

export function getRecordFromAPI(guid) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_RECORD_REQUEST) });

      const response = await recordService.getRecord(guid, {});

      dispatch({
        type: SET_RECORD,
        payload: { record: response },
      });
    } catch (error) {
      dispatch({
        type: requestFail(SET_RECORD),
        payload: error,
      });
    }
  };
}

export function setRecord(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_RECORD,
      payload,
    });
  };
}

export function createRecord(payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(CREATE_RECORD_REQUEST) });

      await recordService.createRecord(payload);

      dispatch({
        type: requestSuccess(CREATE_RECORD_REQUEST),
        payload: { record: payload },
      });
    } catch (error) {
      dispatch({
        type: requestFail(CREATE_RECORD_REQUEST),
        payload: error,
      });
    }
  };
}

export function updateRecord(guid, payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(UPDATE_RECORD_REQUEST) });

      await recordService.updateRecord(guid, payload);

      dispatch({
        type: requestSuccess(UPDATE_RECORD_REQUEST),
        payload: { guid, record: payload },
      });
    } catch (error) {
      console.log('error: ', error);
      dispatch({
        type: requestFail(UPDATE_RECORD_REQUEST),
        payload: error,
      });
    }
  };
}
