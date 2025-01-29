/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

const keyValue = import.meta.env.VITE_TRELLO_API_KEY;
const tokenValue = import.meta.env.VITE_TRELLO_API_TOKEN;

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
      `https://api.trello.com/1/boards/${boardId}/lists?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    console.error("There was an error fetching the board!", error);
    throw error;
  }
}

export async function getAllBoard() {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me/boards?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    console.error("There was an error fetching all boards!", error);
    throw error;
  }
}

export async function createBoard(nameOfBoard) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/boards/?name=${nameOfBoard}&key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    console.error("There was an error creating the board!", error);
    throw error;
  }
}

export async function getCards(listId) {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/lists/${listId}/cards?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    console.error("Error getting card info:", error.message);
    throw error;
  }
}

export async function createCards(cardName, listId) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/cards?key=${keyValue}&token=${tokenValue}`,
      { name: cardName, idList: listId }
    );
    return checkStatus(response);
  } catch (error) {
    console.error("There was an error creating the card!", error);
    throw error;
  }
}

export async function createLists(listName, boardId) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/lists?key=${keyValue}&token=${tokenValue}`,
      { name: listName, idBoard: boardId }
    );
    return checkStatus(response);
  } catch (error) {
    console.error("Error creating the list!", error.message);
    throw error;
  }
}

export async function deleteList(listId) {
  try {
    const response = await axios.put(
      `https://api.trello.com/1/lists/${listId}/closed?key=${keyValue}&token=${tokenValue}`,
      { value: true }
    );
    return checkStatus(response);
  } catch (error) {
    console.error("Error deleting the list!", error.message);
    throw error;
  }
}

export async function deleteCard(cardid) {
  try {
    const response = await axios.delete(
      `https://api.trello.com/1/cards/${cardid}?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    console.error("Error deleting the card!", error.message);
    throw error;
  }
}

export async function getCheckList(cardId) {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    console.error("Error getting the checklist!", error.message);
    throw error;
  }
}

export async function createCheckList(cardId, checkListName) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/checklists?idCard=${cardId}&key=${keyValue}&token=${tokenValue}`,
      { name: checkListName }
    );
    return checkStatus(response);
  } catch (error) {
    console.error("Error creating the checklist!", error.message);
    throw error;
  }
}

export async function deleteCheckList(checkListId) {
  try {
    const response = await axios.delete(
      `https://api.trello.com/1/checklists/${checkListId}?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    console.error("Error deleting the checklist!", error.message);
    throw error;
  }
}

export async function getCheckItems(checkListId) {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    console.error("Error getting the check items!", error.message);
    throw error;
  }
}

export async function createCheckItem(checkListId, checkItemName) {
  try {
    const response = await axios.post(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemName}&key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    console.error("Error creating the check item!", error.message);
    throw error;
  }
}

export async function deleteCheckItem(checkListId, idCheckItem) {
  try {
    const response = await axios.delete(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems/${idCheckItem}?key=${keyValue}&token=${tokenValue}`
    );
    return checkStatus(response);
  } catch (error) {
    console.error("Error deleting the check item!", error.message);
    throw error;
  }
}

export async function changeItemCheckbox(cardId, checkItemId, newState) {
  try {
    const response = await axios.put(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${keyValue}&token=${tokenValue}`,
      { state: newState }
    );
    return checkStatus(response);
  } catch (error) {
    console.error("Error changing the checkbox state!", error.message);
    throw error;
  }
}
