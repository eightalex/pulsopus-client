import { createSlice } from '@reduxjs/toolkit';
import api from '@/api';
import sessionManager from '@/api/SessionManager.ts';
import { EAuthStage } from "@/constants/EAuth.ts";
import { IAuthStore } from "@/interfaces/IAuthStore.ts";
import { onAuthorize, onLogin } from "@/stores/auth/operations.ts";

const initialState: IAuthStore = {
    isAuthorized: false,
    isLoading: false,
    stage: EAuthStage.SIGN_STAGE,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(onAuthorize.pending, (state) => {
                state.isLoading = false;
                state.isAuthorized = false;
            })
            .addCase(onAuthorize.fulfilled, (state, { payload }) => {
                sessionManager.setToken(payload.accessToken);
                state.isAuthorized = true;
                state.isLoading = false;
            })
            .addCase(onAuthorize.rejected, (state) => {
                state.isLoading = false;
                state.isAuthorized = false;
            })
            .addCase(onLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(onLogin.fulfilled, (state, { payload }) => {
                sessionManager.setToken(payload.accessToken);
                state.isAuthorized = true;
                state.isLoading = false;
                api.authService.redirectApp();
            })
            .addCase(onLogin.rejected, (state) => {
                state.isLoading = false;
                state.isAuthorized = false;
            });
    },
});

const { reducer, actions } = authSlice;

export { actions,reducer };
export default reducer;