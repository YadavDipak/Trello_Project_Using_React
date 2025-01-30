import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBoard, createBoard } from "../services/FetchApi";

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const response = await getAllBoard();
  return response;
});

export const addBoard = createAsyncThunk("boards/addBoard", async (name) => {
  const response = await createBoard(name);
  return response;
});

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      });
  },
});

export default boardsSlice.reducer;
