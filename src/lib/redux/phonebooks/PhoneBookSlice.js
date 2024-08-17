import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, load, remove, update, updateAvatar } from "./PhoneBookApi";

const initialState = {
  value: [],
  status: "idle",
  total: 0,
};

export const loadPhoneBookAsync = createAsyncThunk(
  "phonebooks/load",
  async ({ sort, keyword, page }) => {
    const response = await load(sort, keyword, 48, page);
    return {
      data: response.data.phonebooks,
      total: response.data.pages,
      page,
    };
  }
);

export const addPhoneBookAsync = createAsyncThunk(
  "phonebooks/add",
  async ({ id, name, phone }) => {
    const response = await add(name, phone);
    return { data: response.data, id };
  }
);

export const removePhoneBookAsync = createAsyncThunk(
  "phonebooks/remove",
  async (id) => {
    const response = await remove(id);
    return { data: response.data, id };
  }
);

export const updatePhoneBookAsync = createAsyncThunk(
  "phonebooks/update",
  async ({ id, name, phone }) => {
    const response = await update(id, name, phone);
    return { data: response.data, id };
  }
);

export const updateAvatarPhoneBookAsync = createAsyncThunk(
  "phonebooks/avatar",
  async ({ id, data }) => {
    const formData = new FormData();
    formData.append("file", data);
    formData.append("avatar", data.name);
    const response = await updateAvatar(id, formData);
    return { data: response.data, id };
  }
);

export const phoneBookSlice = createSlice({
  name: "phonebooks",
  initialState,
  reducers: {
    addPhoneBook: (state, action) => {
      if (action.payload.name && action.payload.phone) {
        state.value.unshift({
          id: action.payload.id,
          name: action.payload.name,
          phone: action.payload.phone,
          avatar: null,
        });
      }
    },
    removePhoneBook: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },
    updatePhoneBook: (state, action) => {
      state.value = state.value.map((item) => {
        if (item.id === action.payload.id) {
          item.name = action.payload.name;
          item.phone = action.payload.phone;
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPhoneBookAsync.fulfilled, (state, action) => {
        if (action.payload.page !== 1) {
          state.value = state.value.concat(action.payload.data);
        } else if (action.payload.page === 1) state.value = action.payload.data;

        state.total = action.payload.total;
      })
      .addCase(loadPhoneBookAsync.rejected, (state) => {
        state.value = [];
      })
      .addCase(addPhoneBookAsync.fulfilled, (state, action) => {
        state.value = state.value.map((item) => {
          if (item.id === action.payload.id) {
            item.id = action.payload.data.id;
          }
          return item;
        });
      })
      .addCase(updateAvatarPhoneBookAsync.fulfilled, (state, action) => {
        state.value = state.value.map((item) => {
          if (item.id === action.payload.id) {
            item.avatar = action.payload.data.avatar;
          }
          return item;
        });
      });
  },
});

export const { addPhoneBook, removePhoneBook, updatePhoneBook } =
  phoneBookSlice.actions;
export const selectPhoneBook = (state) => state.phonebooks.value;
export const total = (state) => state.phonebooks.total;

export const createPhoneBook = (name, phone) => (dispatch) => {
  const id = Date.now();
  dispatch(addPhoneBook({ id, name, phone }));
  dispatch(addPhoneBookAsync({ id, name, phone }));
};

export const deletePhoneBook = (id) => (dispatch) => {
  dispatch(removePhoneBook({ id }));
  dispatch(removePhoneBookAsync(id));
};

export const editPhoneBook = (id, name, phone) => (dispatch) => {
  dispatch(updatePhoneBook({ id, name, phone }));
  dispatch(updatePhoneBookAsync({ id, name, phone }));
};

export default phoneBookSlice.reducer;
