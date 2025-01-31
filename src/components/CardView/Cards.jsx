import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  FormGroup,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import CheckList from "../CheckList/CheckList";
import PopOver from "../PopOver";
import DeleteDialog from "../DeleteDialog";
import { fetchCheckLists, addCheckList } from "../../store/checklistsSlice";

import { removeCard } from "../../store/cardsSlice";

function Cards({ cardInfo }) {
  const dispatch = useDispatch();
  const { checklists, status } = useSelector((state) => state.checklists);
  const [delCard, setDelCard] = useState(false);
  const [openChecklists, setOpenChecklists] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checkListName, setCheckListName] = useState("");

  useEffect(() => {
    dispatch(fetchCheckLists(cardInfo.id));
  }, [dispatch, cardInfo.id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckListBox = (e) => {
    setCheckListName(e.target.value);
  };

  const handleCheckList = (e) => {
    e.preventDefault();
    dispatch(addCheckList({ cardId: cardInfo.id, checkListName }));
    setCheckListName("");
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleCheckListOpen = () => {
    setOpenChecklists(true);
  };
  const handleCheckListClose = () => {
    setOpenChecklists(false);
  };

  const handleDelOpen = () => setDelCard(true);
  const handleDelClose = () => setDelCard(false);

  const handleDeleteCard = () => {
    dispatch(removeCard({ cardId: cardInfo.id, listId: cardInfo.idList }));
    handleDelClose();
  };

  return (
    <>
      <Box
        sx={{
          m: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#FFF5EE",
          color: "black",
          borderRadius: 2,
        }}
      >
        <Box
          key={cardInfo.id}
          sx={{
            pl: 2,
            width: "100%",
            cursor: "pointer",
          }}
          onClick={handleCheckListOpen}
        >
          {cardInfo.name}
        </Box>
        <IconButton aria-label="settings" onClick={handleDelOpen}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <DeleteDialog
        handleclose={handleDelClose}
        open={delCard}
        title="Delete Card"
        deleteitem={handleDeleteCard}
      />

      <Dialog
        onClose={handleCheckListClose}
        aria-labelledby="customized-dialog-title"
        open={openChecklists}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, width: "38vw" }}
          id="customized-dialog-title"
        >
          {cardInfo.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCheckListClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <FormGroup sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              aria-describedby={id}
              onClick={handleClick}
              sx={{
                width: "70%",
                alignSelf: "center",
                height: "5%",
                display: "inline-block",
              }}
            >
              Add Checklist
            </Button>
            <PopOver
              id={id}
              open={open}
              anchorEl={anchorEl}
              handleClose={handleClose}
              label="Name"
              handleNew={handleCheckList}
              name={checkListName}
              handleNewInput={handleCheckListBox}
            />

            {status === "loading" ? (
              <Box>Loading Checklists...</Box>
            ) : checklists.length > 0 ? (
              checklists.map((checkList) => (
                <CheckList
                  key={checkList.id}
                  cardObj={cardInfo}
                  checkList={checkList}
                />
              ))
            ) : (
              <Box>No Checklists Found</Box>
            )}
          </FormGroup>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Cards;
