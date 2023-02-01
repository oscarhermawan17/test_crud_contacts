// store.js
import { createSlice, createAsyncThunk, configureStore  } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://contact.herokuapp.com/contact';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(API_URL);
    return response.data.data
  }
);

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (postData) => {
    try {
      const response = await axios.post(API_URL, postData);
      if(response.status === 201) {
        return {
          id:  Math.floor((Math.random() * 1000000) + 1),
          ...postData
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    loading: false,
    error: '',
    errorCreate: '',
  },
  reducers: {
    removeError: (state) => {
      state.errorCreate = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
      state.error = '';
      state.errorCreate = ''
    })
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.loading = false;
      state.contacts = [];
      state.error = action.error.message;
      state.errorCreate = ''
    })

    builder.addCase(createContact.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(createContact.fulfilled, (state, action) => {
      state.contacts = [...state.contacts, action.payload];
      state.loading = false;
      state.error = '';
      state.errorCreate = '';
    })
    builder.addCase(createContact.rejected, (state, action) => {
      state.loading = false;
      state.errorCreate = action.error.message;
    })
  },
});

const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  }
});


export const { removeError } = contactsSlice.actions;
export default store;