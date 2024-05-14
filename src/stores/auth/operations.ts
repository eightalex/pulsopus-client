import { AxiosError } from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api';
import { IAuthCredential, IAuthReturnData, IAuthTokensData } from "@/interfaces/IAuthStore.ts";
import { actions } from './authSlice.ts';

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
            const error = err as Error;
            console.error('[onLogin]: ', error);
            if ((err as AxiosError).status === 403) {
                thunkApi.dispatch(actions.setCredential(credential));
                thunkApi.dispatch(actions.setRequestAccessStage());
            }
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const onSendRequestAccess = createAsyncThunk<IAuthCredential, string>(
    'auth/request-access',
    async (recipient, thunkApi) => {
        try {
            const credential = thunkApi.getState().auth.credential;
            if (!credential) {
                throw new Error('Unexpected exception auth/request-access. No credential');
            }
            await api.authService.onRequestAccess(recipient, credential as IAuthCredential);
            return thunkApi.fulfillWithValue(credential as IAuthCredential);
        } catch (err) {
              const error = err as Error;
              console.error('[onSendRequestAccess]: ', error);
              return thunkApi.rejectWithValue(error.message);
        }
    }
);
