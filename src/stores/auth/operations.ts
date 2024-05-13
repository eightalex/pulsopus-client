import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api';
import { IAuthCredential, IAuthReturnData, IAuthTokensData } from "@/interfaces/IAuthStore.ts";

export const onAuthorize = createAsyncThunk<IAuthReturnData, void>(
  'auth/authorize',
  async (_, thunkApi) => {
      try {
        const data =  await api.authService.onAuthorize();
        if(!data) {
          throw new Error('Unexpected exception auth/authorize. No data');
        }
        return data;
      } catch (err) {
        const error = err as Error;
        console.error('[onAuthorize]: ', error);
        return thunkApi.rejectWithValue('message');
      }
  }
);

export const onLogin = createAsyncThunk<IAuthTokensData, IAuthCredential>(
  'auth/login',
  async ({ redirect = '', ...credential }, thunkApi) => {
      try {
        console.log('credential', credential);
        const data = await api.authService.onLogin(credential);
        if(!data) {
          throw new Error('Unexpected exception auth/login. No data');
        }
        return data;
      } catch (err) {
        const error = err as Error;
        console.error('[onLogin]: ', error);
        return thunkApi.rejectWithValue(error.message);
      }
  }
);
