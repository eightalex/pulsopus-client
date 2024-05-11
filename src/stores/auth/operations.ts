import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api';
import { IAuthCredential, IAuthTokensData } from "@/interfaces/IAuthStore.ts";

export const onAuthorize = createAsyncThunk(
  'auth/authorize',
  async (_, thunkApi) => {
    console.info('>> @/auth/authorize');
      try {
        const data = await api.authService.onAuthorize();
        if(!data) {
          throw new Error('Unexpected exception auth/authorize. No data');
        }
        return data;
        // const { data } = await axios.post('https://dev-api.exzi.com/v3/redirect-auth/token', data);
        // return data;
      } catch (error) {
        console.error('[onAuthorize]: ', error);
        return thunkApi.rejectWithValue('message');
      }
  }
);

export const onLogin = createAsyncThunk<IAuthTokensData, IAuthCredential>(
  'auth/login',
  async ({ redirect = '', ...credential }, thunkApi) => {
    console.log('redirect', redirect);
      try {
        console.log('credential', credential);
        const data = await api.authService.onLogin(credential);
        if(!data) {
          throw new Error('Unexpected exception auth/login. No data');
        }
        return data;
        // const { data } = await axios.post('https://dev-api.exzi.com/v3/redirect-auth/token', credential);
        // return data;
      } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue('message');
      }
  }
);
