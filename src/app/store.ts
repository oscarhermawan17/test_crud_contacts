// store.js
import { createSlice, createAsyncThunk, configureStore  } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://contact.herokuapp.com/contact';

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
}

// GET ALL CONTACTS
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(API_URL);
    return response.data.data
  }
);

// CREATE CONTACT
export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (postData) => {
    try {
      const response = await axios.post(API_URL, postData);
      if(response.status === 201) {
        return {
          // DONT GET ID (RESPONSE), AFTER HIT API
          id:  Math.floor((Math.random() * 1000000) + 1),
          ...postData
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }
);

// GET SINGLE CONTACT
export const getSingleContact = createAsyncThunk(
  'contacts/getSingleContact',
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data
  }
);

// UPDATE SINGLE CONTACT (PUT)
export const updateSingleContact = createAsyncThunk(
  'contacts/updateSingleContact',
  async ({ id, firstName, lastName, age, photo, contacts }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { firstName, lastName, age, photo }, config);
      if(response.status === 201) {
        const newContacts = contacts.map(contact => contact.id === id ? { id, firstName, lastName, age, photo } : contact)
        return newContacts;
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

    // NEW
    builder.addCase(updateSingleContact.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(updateSingleContact.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
    })
    builder.addCase(updateSingleContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  },
});

const contactSingleSlice = createSlice({
  name: 'contactSingle',
  initialState: {
    contact: null,
    loading: false,
    error: '',
  },
  reducers: {
    updateContact: (state, action) => {
      state.contact[action.payload.entity] = action.payload.value
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSingleContact.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getSingleContact.fulfilled, (state, action) => {
      state.contact = action.payload;
      state.loading = false;
      state.error = '';
    })
    builder.addCase(getSingleContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  },
});

const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    contactSingle: contactSingleSlice.reducer
  }
});

export const { removeError } = contactsSlice.actions;
export const { updateContact } = contactSingleSlice.actions;
export default store;