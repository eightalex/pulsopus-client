import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Api from '@/api';

const api = new Api();

export const authorize = createAsyncThunk(
  'auth/authorize',
  async (data, thunkApi) => {
    console.info('>> auth/authorize');
      try {
        const { data } = await axios.post('https://dev-api.exzi.com/v3/redirect-auth/token', data);
        console.log('auth/signIn > ', data);
        return data;
      } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue('message');
      }
  }
);
