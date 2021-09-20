import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { reducers } from './reducers';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	reducer: reducers
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;