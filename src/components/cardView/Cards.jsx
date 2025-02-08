import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  FormGroup,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import {
  deleteCard,
  getCheckList,
  createCheckList,
} from "../../services/FetchApi";
import CheckList from "../CheckList/CheckList";
import PopOver from "../PopOver";
import DeleteDialog from "../DeleteDialog";

function Cards({ cardInfo, handleCards }) {
  const [delCard, setDelCard] = useState(false);
  const [checkLists, setAllCheckList] = useState([]);
  const [openChecklists, setOpenChecklists] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checkListName, setCheckListName] = useState("");

  useEffect(() => {
    getCheckList(cardInfo.id)
      .then((data) => {
        setAllCheckList(data);
      })
      .catch((err) => {
        throw new Error(`Failed to fetch checklists: ${err.message}`);
      });
  }, [cardInfo.id]);

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

    createCheckList(cardInfo.id, checkListName)
      .then((data) => {
        handleNewCheckList(data);
        setCheckListName("");
        handleClose();
      })
      .catch((err) => {
        throw new Error(`Failed to create checklist: ${err.message}`);
      });
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
    handleDelClose();
    const id = cardInfo.id;
    deleteCard(id);
    handleCards(id);
  };

  const handleNewCheckList = (data) => {
    setAllCheckList([...checkLists, data]);
  };

  const handleDeleteCheckList = (id) => {
    const newCheckList = checkLists.filter((checkList) => checkList.id !== id);
    setAllCheckList(newCheckList);
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
        title={"  Delete Card"}
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
              label={"Name"}
              handleNew={handleCheckList}
              name={checkListName}
              handleNewInput={handleCheckListBox}
            />

            {checkLists.map((checkList) => (
              <CheckList
                key={checkList.id}
                cardObj={cardInfo}
                handleCheckListDelete={handleDeleteCheckList}
                checkList={checkList}
              />
            ))}
          </FormGroup>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Cards;
