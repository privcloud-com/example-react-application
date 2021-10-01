import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import recordReducer from './record';
import recordTypeReducer from './recordType';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  record: recordReducer,
  recordType: recordTypeReducer,
});

export default createRootReducer;
