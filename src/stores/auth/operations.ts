import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api';
import sessionManager from "@/api/SessionManager.ts";
import { IAuthCredential, IAuthReturnData, IAuthTokensData } from "@/interfaces/IAuthStore.ts";
import { IErrorResponseData } from "@/interfaces/IErrorResponseData.ts";
import { IRootState } from "@/interfaces/IRootStore.ts";
import { actions } from './slice.ts';

export const onAuthorize = createAsyncThunk<IAuthReturnData, void>(
  'auth/authorize',
  async (_, thunkApi) => {
    try {
      const data = await api.authService.onAuthorize();
      if (!data) {
        throw new Error('Unexpected exception auth/authorize. No data');
      }
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      const err = error as AxiosError<IErrorResponseData>;
      const msg = err.response?.data?.message || err.message;
      console.error('[onAuthorize]: ', msg, err);
      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const onLogin = createAsyncThunk<IAuthTokensData, IAuthCredential>(
  'auth/login',
  async (credential, thunkApi) => {
    try {
      const data = await api.authService.onLogin(credential);
      if (!data) {
        throw new Error('Unexpected exception auth/login. No data');
      }
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      const err = error as AxiosError<IErrorResponseData>;
      const msg = err.response?.data?.message || err.message;
      const responseStatusCode = err.response?.status as number;

      console.error('[onLogin]: ', msg, err);

      if (responseStatusCode === 403) {
        thunkApi.dispatch(actions.setCredential(credential));
        thunkApi.dispatch(actions.setRequestAccessStage());
      }

      if(responseStatusCode !== 403) {
        toast.error(msg);
      }

      return thunkApi.rejectWithValue(msg);
    }
  }
);

export const onLogout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      await api.authService.onLogout();
    } catch (err) {
      console.error(err);
    } finally {
      sessionManager.removeTokens();
    }
  }
);

export const onSendRequestAccess = createAsyncThunk<IAuthCredential, string>(
  'auth/request-access',
  async (recipient, thunkApi) => {
    try {
      const credential = (thunkApi.getState() as IRootState).auth.credential;
      if (!credential) {
        throw new Error('Unexpected exception auth/request-access. No credential');
      }
      await api.authService.onRequestAccess(recipient, credential as IAuthCredential);
      return thunkApi.fulfillWithValue(credential as IAuthCredential);
    } catch (error) {
      const err = error as AxiosError<IErrorResponseData>;
      const msg = err.response?.data?.message || err.message;
      console.error('[onSendRequestAccess]: ', msg, err);
      toast.error(msg);
      return thunkApi.rejectWithValue(msg);
    }
  }
);