import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import CheckItems from "../CheckItems/CheckItems";
import PopOver from "../PopOver";
import LinearProgressWithLabel from "../Progress";
import {
  fetchCheckItems,
  addCheckItem,
  removeCheckList,
} from "../../store/checkItemsSlice";

function CheckList({ checkList, cardObj }) {
  const dispatch = useDispatch();
  const { checkItems, status } = useSelector((state) => state.checkItems);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checkItemName, setCheckItemName] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    dispatch(fetchCheckItems(checkList.id));
  }, [dispatch, checkList.id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckItemInput = (e) => {
    setCheckItemName(e.target.value);
  };

  const handleCheckItem = (e) => {
    e.preventDefault();
    dispatch(addCheckItem({ checkListId: checkList.id, checkItemName }));
    setCheckItemName("");
    handleClose();
  };

  const handleDelete = () => {
    dispatch(removeCheckList(checkList.id));
  };

  const updateProgress = (items) => {
    const totalCheckItems = items.length;
    const checkedLength = items.filter(
      (item) => item.state === "complete"
    ).length;
    const percentage =
      totalCheckItems === 0 ? 0 : (checkedLength / totalCheckItems) * 100;
    setProgress(percentage);
  };

  useEffect(() => {
    updateProgress(checkItems);
  }, [checkItems]);

  return (
    <Box
      sx={{
        border: "1px solid transparent",
        backgroundColor: "#ffff",
        borderRadius: 3,
        mt: 2,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
          m: 0,
          alignItems: "center",
        }}
      >
        <FormGroup>
          <FormControlLabel
            disabled
            control={<CheckBoxIcon />}
            label={checkList.name}
          />
        </FormGroup>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box sx={{ width: "100%", m: 2 }}>
        <LinearProgressWithLabel color="success" value={progress} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {status === "loading" ? (
          <Box>Loading Check Items...</Box>
        ) : checkItems.length > 0 ? (
          checkItems.map((checkItem) => (
            <CheckItems
              key={checkItem.id}
              checkItem={checkItem}
              cardObj={cardObj}
            />
          ))
        ) : (
          <Box>No Check Items Found</Box>
        )}

        <Button
          aria-describedby="simple-popover"
          variant="outlined"
          onClick={handleClick}
          sx={{ width: "80%", mt: 2, height: "5%", display: "inline-block" }}
        >
          Add an Item
        </Button>

        <PopOver
          id="simple-popover"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          handleClose={handleClose}
          label="CheckItem Name"
          handleNew={handleCheckItem}
          name={checkItemName}
          handleNewInput={handleCheckItemInput}
        />
      </Box>
    </Box>
  );
}

export default CheckList;
