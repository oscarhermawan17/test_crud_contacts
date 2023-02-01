// store.js
import { createSlice, createAsyncThunk, configureStore  } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://contact.herokuapp.com/contact';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    console.log('masuk');
    const response = await axios.get(API_URL);
    return response.data.data
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchContacts.pending]: (state) => {
      state.loading = true;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
      state.error = null;
    },
    [fetchContacts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  }
});

export default store;