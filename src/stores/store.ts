import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice.ts';
import popupReducer from './popup/popupSlice.ts';

export default configureStore({
    reducer: {
        auth: authReducer,
        popup: popupReducer,
    }
});