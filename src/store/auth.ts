import { createAction, createReducer } from '@reduxjs/toolkit';

import { ActionTypes } from './types';

interface AuthState {
    token: string;
    name: string;
    email: string;
    id: string;
}

export const logIn = createAction<AuthState>(ActionTypes.LOG_IN);
export const logOut = createAction(ActionTypes.LOG_OUT);

const initialState: AuthState = {} as AuthState;

export const authReducer = createReducer(initialState, (builder) => {
	builder.addCase(logIn, (state, action) => {
		state.token = action.payload.token;
		state.id = action.payload.id;
		state.email = action.payload.email;
		state.name = action.payload.name;
	});
	builder.addCase(logOut, (state, action) => {
		state.token = '';
		state.id = '';
		state.email = '';
		state.name = '';
	});
});