import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCards,
  createCards,
  deleteCard,
  deleteList,
} from "../services/FetchApi";

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (listId) => {
    const response = await getCards(listId);
    return response;
  }
);

export const addCard = createAsyncThunk(
  "cards/addCard",
  async ({ cardName, listId }) => {
    const response = await createCards(cardName, listId);
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

export const removeCard = createAsyncThunk(
  "cards/removeCard",
  async ({ cardId, listId }) => {
    await deleteCard(cardId);
    return { listId, cardId };
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards[action.payload[0]?.idList] = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        if (!state.cards[action.payload.idList]) {
          state.cards[action.payload.idList] = [];
        }
        state.cards[action.payload.idList].push(action.payload);
      })
      .addCase(removeCard.fulfilled, (state, action) => {
        const { listId, cardId } = action.payload;
        state.cards[listId] = state.cards[listId].filter(
          (card) => card.id !== cardId
        );
      });
  },
});

export default cardsSlice.reducer;
