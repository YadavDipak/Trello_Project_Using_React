import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boardsSlice";
import listsReducer from "./listsSlice";
import cardsReducer from "./cardsSlice";
import checklistsReducer from "./checklistsSlice";
import checkItemsReducer from "./checkItemsSlice";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer,
    checklists: checklistsReducer,
    checkItems: checkItemsReducer,
  },
});
