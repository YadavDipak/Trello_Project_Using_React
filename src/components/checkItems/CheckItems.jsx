import { useState, useEffect } from "react";
import { Box, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { changeItemCheckbox, deleteCheckItem } from "../../services/FetchApi";

function CheckItems({
  checkItem,
  handleCheckChange,
  handleDeleteCheckItem,
  cardObj,
}) {
  const [checkedState, setCheckedState] = useState(null);

  useEffect(() => {
    setCheckedState(checkItem.state === "complete");
  }, []);

  function handleDelete() {
    const checkItemId = checkItem.id;
    deleteCheckItem(checkItem.idChecklist, checkItemId)
      .then(() => {
        handleDeleteCheckItem(checkItemId);
      })
      .catch((err) => {
        throw new Error(`Failed to delete checkItem: ${err.message}`);
      });
  }

  function handleCheckChangeLocal() {
    const newCheckState = !checkedState;
    const checkState = newCheckState ? "complete" : "incomplete";
    setCheckedState(newCheckState);
    changeItemCheckbox(cardObj.id, checkItem.id, checkState)
      .then(() => {
        handleCheckChange(checkItem.id, checkState);
      })
      .catch((err) => {
        throw new Error(`Failed to update checkbox state: ${err.message}`);
      });
  }

  return (
    <>
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
    </>
  );
}

export default CheckItems;
