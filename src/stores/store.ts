import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice.ts';
import popupReducer from './popup/slice.ts';

export default configureStore({
    reducer: {
        auth: authReducer,
        popup: popupReducer,
    }
});