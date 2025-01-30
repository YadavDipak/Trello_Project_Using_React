import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCheckItems,
  createCheckItem,
  deleteCheckItem,
  changeItemCheckbox,
  deleteCheckList,
} from "../services/FetchApi";

// Async Thunks
export const fetchCheckItems = createAsyncThunk(
  "checkItems/fetchCheckItems",
  async (checkListId) => {
    const response = await getCheckItems(checkListId);
    return response;
  }
);

export const addCheckItem = createAsyncThunk(
  "checkItems/addCheckItem",
  async ({ checkListId, checkItemName }) => {
    const response = await createCheckItem(checkListId, checkItemName);
    return response;
  }
);

export const removeCheckItem = createAsyncThunk(
  "checkItems/removeCheckItem",
  async ({ checkListId, idCheckItem }) => {
    const response = await deleteCheckItem(checkListId, idCheckItem);
    return response;
  }
);

export const updateCheckItem = createAsyncThunk(
  "checkItems/updateCheckItem",
  async ({ cardId, checkItemId, newState }) => {
    const response = await changeItemCheckbox(cardId, checkItemId, newState);
    return response;
  }
);

export const removeCheckList = createAsyncThunk(
  "checkItems/removeCheckList",
  async (checkListId) => {
    const response = await deleteCheckList(checkListId);
    return response;
  }
);

// Slice
const checkItemsSlice = createSlice({
  name: "checkItems",
  initialState: {
    checkItems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCheckItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.checkItems = action.payload;
      })
      .addCase(fetchCheckItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCheckItem.fulfilled, (state, action) => {
        state.checkItems.push(action.payload);
      })
      .addCase(removeCheckItem.fulfilled, (state, action) => {
        state.checkItems = state.checkItems.filter(
          (checkItem) => checkItem.id !== action.payload.id
        );
      })
      .addCase(updateCheckItem.fulfilled, (state, action) => {
        const index = state.checkItems.findIndex(
          (checkItem) => checkItem.id === action.payload.id
        );
        state.checkItems[index].state = action.payload.state;
      })
      .addCase(removeCheckList.fulfilled, (state, action) => {
        state.checkItems = state.checkItems.filter(
          (checkItem) => checkItem.idChecklist !== action.payload.id
        );
      });
  },
});

export default checkItemsSlice.reducer;
