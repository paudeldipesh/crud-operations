import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../models/user";

interface UserState {
  users: [] | User[];
  isLoading: boolean;
  error: null | string;
  search: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
  search: "",
};

const APIURL = import.meta.env.VITE_API_URL;

// CREATE ACTION
export const createUser = createAsyncThunk(
  "createUser",
  async (data: User, thunkAPI) => {
    try {
      const response = await axios.post(APIURL, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong.");
    }
  }
);

// READ ACTION
export const showUser = createAsyncThunk("showUser", async (_, thunkAPI) => {
  try {
    const response = await axios.get(APIURL);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong.");
  }
});

// UPDATE ACTION
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data: User, thunkAPI) => {
    try {
      const response = await axios.put(`${APIURL}/${data.id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong.");
    }
  }
);

// DELETE ACTION
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.delete(`${APIURL}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong.");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    dataToBeSearched: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = [...state.users, action.payload];
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(showUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id } = action.payload;
        if (id) state.users = state.users.filter((cur) => cur.id !== id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { dataToBeSearched } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
