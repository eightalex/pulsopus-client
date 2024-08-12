import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@/api';
import sessionManager from '@/api/SessionManager.ts';
import { EAuthStage } from "@/constants/EAuth.ts";
import { IAuthCredential, IAuthStore } from "@/interfaces/IAuthStore.ts";
import { onAuthorize, onLogin, onLogout, onSendRequestAccess } from "@/stores/auth/operations.ts";

const initialState: IAuthStore = {
  isAuthorized: false,
  isLoading: false,
  stage: EAuthStage.AUTH_STAGE_SIGN,
  redirect: '',
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredential: (state, { payload }: PayloadAction<IAuthCredential>) => {
      state.credential = payload;
      return state;
    },
    setRedirect: (state, { payload }: PayloadAction<IAuthStore["redirect"]>) => {
      state.redirect = payload;
      return state;
    },
    resetStage: (state) => {
      state.credential = undefined;
      state.stage = EAuthStage.AUTH_STAGE_SIGN;
      return state;
    },
    setStage: (state, { payload }: PayloadAction<EAuthStage>) => {
      state.stage = payload;
      return state;
    },
    setSignInEmailStage: (state) => {
      state.stage = EAuthStage.AUTH_STAGE_SIGN_EMAIL;
      return state;
    },
    setRequestAccessStage: (state) => {
      state.stage = EAuthStage.AUTH_STAGE_REQUEST_ACCESS;
      return state;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(onAuthorize.pending, (state) => {
        state.isLoading = false;
        state.isAuthorized = false;
      })
      .addCase(onAuthorize.rejected, (state) => {
        state.isLoading = false;
        state.isAuthorized = false;
      })
      .addCase(onAuthorize.fulfilled, (state, { payload }) => {
        sessionManager.setToken(payload.accessToken);
        state.isAuthorized = true;
        state.isLoading = false;
      })
      .addCase(onLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(onLogin.rejected, (state) => {
        state.isLoading = false;
        state.isAuthorized = false;
      })
      .addCase(onLogin.fulfilled, (state, { payload }) => {
        sessionManager.setToken(payload.accessToken);
        state.isAuthorized = true;
        state.isLoading = false;
        api.authService.redirectApp(state.redirect);
      })
      .addCase(onSendRequestAccess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(onSendRequestAccess.rejected, (state) => {
        state.isLoading = false;
        state.stage = EAuthStage.AUTH_STAGE_REQUEST_ACCESS_ERROR;
      })
      .addCase(onSendRequestAccess.fulfilled, (state) => {
        state.isLoading = false;
        state.stage = EAuthStage.AUTH_STAGE_REQUEST_ACCESS_SUCCESS;
      })
      .addCase(onLogout.pending, (state) => {
        state.isLoading = false;
        state.isAuthorized = false;
      });
  },
});

const { reducer, actions } = slice;

export { actions, reducer };
export default reducer;