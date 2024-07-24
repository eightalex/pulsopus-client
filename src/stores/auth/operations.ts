import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api';
import sessionManager from "@/api/SessionManager.ts";
import { IAuthCredential, IAuthReturnData, IAuthTokensData } from "@/interfaces/IAuthStore.ts";
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
    } catch (err) {
      const error = err as Error;
      console.error('[onAuthorize]: ', error);
      return thunkApi.rejectWithValue('message');
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
    } catch (err) {
      // TODO: axios error type with data.message ?? | refactor
      const error = err as Error & { data?: { message: string; } };
      const axError = err as AxiosError;
      console.error('[onLogin]: ', error);
      if (axError.status === 403) {
        thunkApi.dispatch(actions.setCredential(credential));
        thunkApi.dispatch(actions.setRequestAccessStage());
      }
      if (![403].includes(axError.status as number)) {
        toast.error(error.data?.message || error.message);
      }
      return thunkApi.rejectWithValue(error.message);
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
    } catch (err) {
      // TODO: axios error type with data.message ?? | refactor
      const error = err as Error & { data?: { message: string; } };
      console.error('[onSendRequestAccess]: ', error);
      toast.error(error.data?.message || error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
