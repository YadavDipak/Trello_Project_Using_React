import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCheckList,
  createCheckList,
  deleteCheckList,
  deleteCard,
} from "../services/FetchApi";

export const fetchCheckLists = createAsyncThunk(
  "checklists/fetchCheckLists",
  async (cardId) => {
    const response = await getCheckList(cardId);
    return response;
  }
);

export const addCheckList = createAsyncThunk(
  "checklists/addCheckList",
  async ({ cardId, checkListName }) => {
    const response = await createCheckList(cardId, checkListName);
    return response;
  }
);
export const removeCard = createAsyncThunk(
  "cards/removeCard",
  async (cardId) => {
    const response = await deleteCard(cardId);
    return response;
  }
);

export const removeCheckList = createAsyncThunk(
  "checklists/removeCheckList",
  async (checkListId) => {
    const response = await deleteCheckList(checkListId);
    return response;
  }
);

const checklistsSlice = createSlice({
  name: "checklists",
  initialState: {
    checklists: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckLists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCheckLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.checklists = action.payload;
      })
      .addCase(fetchCheckLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCheckList.fulfilled, (state, action) => {
        state.checklists.push(action.payload);
      })
      .addCase(removeCheckList.fulfilled, (state, action) => {
        state.checklists = state.checklists.filter(
          (checklist) => checklist.id !== action.payload.id
        );
      });
  },
});

export default checklistsSlice.reducer;
