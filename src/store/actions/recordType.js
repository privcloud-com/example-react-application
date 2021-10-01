import recordTypeService from '../../services/recordTypeService';
import { requestFail, requestPending, requestSuccess } from '../../utils/api';
import {
  GET_RECORD_TYPES_REQUEST,
  GET_RECORD_TYPE_REQUEST,
  CREATE_RECORD_TYPE_REQUEST,
  UPDATE_RECORD_TYPE_REQUEST,
  SET_RECORD_TYPE,
  DELETE_RECORD_TYPE_REQUEST,
} from '../types';

export function getRecordTypes() {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_RECORD_TYPES_REQUEST) });

      const recordTypes = await recordTypeService.listRecordType({});

      dispatch({
        type: requestSuccess(GET_RECORD_TYPES_REQUEST),
        payload: { recordTypes },
      });
    } catch (error) {
      dispatch({
        type: requestFail(GET_RECORD_TYPES_REQUEST),
        payload: error.response.data,
      });
    }
  };
}

export function getRecordType(id, fields = []) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(GET_RECORD_TYPE_REQUEST) });

      const recordType = await recordTypeService.getRecordType(id, { fields });

      dispatch({
        type: requestSuccess(GET_RECORD_TYPE_REQUEST),
        payload: { recordType },
      });
    } catch (error) {
      dispatch({
        type: requestFail(GET_RECORD_TYPE_REQUEST),
        payload: error.response.data,
      });
    }
  };
}

export function createRecordType(payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(CREATE_RECORD_TYPE_REQUEST) });

      const recordType = await recordTypeService.createRecordType(payload);

      dispatch({
        type: requestSuccess(CREATE_RECORD_TYPE_REQUEST),
        payload: { recordType },
      });
    } catch (error) {
      dispatch({
        type: requestFail(CREATE_RECORD_TYPE_REQUEST),
        payload: error.response.data,
      });
    }
  };
}

export function updateRecordType(id, payload) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(UPDATE_RECORD_TYPE_REQUEST) });

      const recordType = await recordTypeService.updateRecordType(id, payload);

      dispatch({
        type: requestSuccess(UPDATE_RECORD_TYPE_REQUEST),
        payload: { recordType },
      });
    } catch (error) {
      dispatch({
        type: requestFail(UPDATE_RECORD_TYPE_REQUEST),
        payload: error.response.data,
      });
    }
  };
}

export function deleteRecordType(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: requestPending(DELETE_RECORD_TYPE_REQUEST) });

      await recordTypeService.deleteRecordType(id);

      dispatch({
        type: requestSuccess(DELETE_RECORD_TYPE_REQUEST),
        payload: { id },
      });
    } catch (error) {
      dispatch({
        type: requestFail(DELETE_RECORD_TYPE_REQUEST),
        payload: error.response.data,
      });
    }
  };
}

export function setRecordType(payload) {
  return (dispatch) => {
    dispatch({
      type: SET_RECORD_TYPE,
      payload,
    });
  };
}
