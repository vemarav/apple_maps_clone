import { combineReducers } from '@reduxjs/toolkit';

import locations from './slices/locations';

const rootReducer = combineReducers({
  locations,
});

export default rootReducer;
