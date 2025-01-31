/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { URL, keyValue, tokenValue } from "../config/config";

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

export async function FetchApi(boardId) {
  try {
    const response = await axios.get(
      `${URL}/boards/${boardId}/lists?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function getAllBoard() {
  try {
    const response = await axios.get(
      `${URL}/members/me/boards?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function createBoard(nameOfBoard) {
  try {
    const response = await axios.post(
      `${URL}/boards/?name=${nameOfBoard}&key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function getCards(listId) {
  try {
    const response = await axios.get(
      `${URL}/lists/${listId}/cards?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function createCards(cardName, listId) {
  try {
    const response = await axios.post(
      `${URL}/cards?key=${keyValue}&token=${tokenValue}`,
      { name: cardName, idList: listId }
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function createLists(listName, boardId) {
  try {
    const response = await axios.post(
      `${URL}/lists?key=${keyValue}&token=${tokenValue}`,
      { name: listName, idBoard: boardId }
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function deleteList(listId) {
  try {
    const response = await axios.put(
      `${URL}/lists/${listId}/closed?key=${keyValue}&token=${tokenValue}`,
      { value: true }
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function deleteCard(cardid) {
  try {
    const response = await axios.delete(
      `${URL}/cards/${cardid}?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function getCheckList(cardId) {
  try {
    const response = await axios.get(
      `${URL}/cards/${cardId}/checklists?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function createCheckList(cardId, checkListName) {
  try {
    const response = await axios.post(
      `${URL}/checklists?idCard=${cardId}&key=${keyValue}&token=${tokenValue}`,
      { name: checkListName }
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function deleteCheckList(checkListId) {
  try {
    const response = await axios.delete(
      `${URL}/checklists/${checkListId}?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function getCheckItems(checkListId) {
  try {
    const response = await axios.get(
      `${URL}/checklists/${checkListId}/checkItems?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function createCheckItem(checkListId, checkItemName) {
  try {
    const response = await axios.post(
      `${URL}/checklists/${checkListId}/checkItems?name=${checkItemName}&key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function deleteCheckItem(checkListId, idCheckItem) {
  try {
    const response = await axios.delete(
      `${URL}/checklists/${checkListId}/checkItems/${idCheckItem}?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}

export async function changeItemCheckbox(cardId, checkItemId, newState) {
  try {
    const response = await axios.put(
      `${URL}/cards/${cardId}/checkItem/${checkItemId}?key=${keyValue}&token=${tokenValue}`,
      { state: newState }
    );
    return checkStatus(response);
  } catch (error) {
    throw error;
  }
}
