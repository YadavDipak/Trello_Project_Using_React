import React, { useState } from "react";
import { Box, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { removeCheckItem, updateCheckItem } from "../../store/checkItemsSlice";

function CheckItems({ checkItem, cardObj }) {
  const dispatch = useDispatch();
  const [checkedState, setCheckedState] = useState(
    checkItem.state === "complete"
  );

  const handleDelete = () => {
    dispatch(
      removeCheckItem({
        checkListId: checkItem.idChecklist,
        idCheckItem: checkItem.id,
      })
    );
  };

  const handleCheckChangeLocal = () => {
    const newCheckState = !checkedState;
    const checkState = newCheckState ? "complete" : "incomplete";
    setCheckedState(newCheckState);
    dispatch(
      updateCheckItem({
        cardId: cardObj.id,
        checkItemId: checkItem.id,
        newState: checkState,
      })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <Box>
        <Checkbox
          fontSize="inherit"
          checked={checkedState}
          color="default"
          onChange={handleCheckChangeLocal}
        />
        {checkItem.name}
      </Box>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}

export default CheckItems;
