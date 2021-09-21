import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './auth';

export const reducers = combineReducers({
	auth: authReducer
});