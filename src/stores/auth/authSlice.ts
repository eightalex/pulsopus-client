import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@/api';
import sessionManager from '@/api/SessionManager.ts';
import { EAuthStage } from "@/constants/EAuth.ts";
import { IAuthCredential, IAuthStore } from "@/interfaces/IAuthStore.ts";
import { onAuthorize, onLogin, onSendRequestAccess } from "@/stores/auth/operations.ts";

const initialState: IAuthStore = {
    isAuthorized: false,
    isLoading: false,
    stage: EAuthStage.SIGN_STAGE,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredential: (state, { payload }: PayloadAction<IAuthCredential>) => {
            state.credential = payload;
            return state;
        },
        resetStage: (state) => {
            state.credential = undefined;
            state.stage = EAuthStage.SIGN_STAGE;
            return state;
        },
        setStage: (state, { payload }: PayloadAction<EAuthStage>) => {
            state.stage = payload;
            return state;
        },
        setRequestAccessStage: (state) => {
            state.stage = EAuthStage.REQUEST_ACCESS_STAGE;
            return state;
        },
    },
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
            })
            .addCase(onSendRequestAccess.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(onSendRequestAccess.fulfilled, (state) => {
                state.isLoading = false;
                state.stage = EAuthStage.REQUEST_ACCESS_SUCCESS_STAGE;
            })
            .addCase(onSendRequestAccess.rejected, (state) => {
                state.isLoading = false;
                state.stage = EAuthStage.REQUEST_ACCESS_ERROR_STAGE;
            });
    },
});

const { reducer, actions } = authSlice;

export { actions,reducer };
export default reducer;