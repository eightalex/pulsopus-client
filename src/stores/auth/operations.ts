import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '@/api';
import { IAuthCredential } from "@/interfaces/IAuthStore.ts";

const api = new Api();

export const onAuthorize = createAsyncThunk(
  'auth/me',
  async (_, thunkApi) => {
    console.info('>> @/auth/authorize');
      try {
        const { accessToken } = await api.authService.getTokens();
        if(!accessToken) return;
        // const { data } = await axios.post('https://dev-api.exzi.com/v3/redirect-auth/token', data);
        // console.log('auth/signIn > ', data);
        // return data;
      } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue('message');
      }
  }
);

export const onLogin = createAsyncThunk<any, IAuthCredential>(
  'auth/login',
  async (credential, thunkApi) => {
    console.info('>> @/auth/login');
      try {
        console.log('credential', credential);
        // const { data } = await axios.post('https://dev-api.exzi.com/v3/redirect-auth/token', credential);
        // console.log('auth/signIn > ', data);
        // return data;
      } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue('message');
      }
  }
);
