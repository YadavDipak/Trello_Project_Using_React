import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi, createLists, deleteList } from "../services/FetchApi";

export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (boardId) => {
    const response = await FetchApi(boardId);
    return response;
  }
);

export const addList = createAsyncThunk(
  "lists/addList",
  async ({ listName, boardId }) => {
    const response = await createLists(listName, boardId);
    return response;
  }
);

export const removeList = createAsyncThunk(
  "lists/removeList",
  async (listId) => {
    const response = await deleteList(listId);
    return response;
  }
);

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      .addCase(removeList.fulfilled, (state, action) => {
        state.lists = state.lists.filter(
          (list) => list.id !== action.payload.id
        );
      });
  },
});

export default listsSlice.reducer;
