import React, { useState, useEffect } from "react";
import { Box, Card, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../CardView/Cards";
import DialogBox from "../DialogBox";
import DeleteDialog from "../DeleteDialog";
import { fetchCards, addCard, removeList } from "../../store/cardsSlice";

function Lists({ listInfo }) {
  const dispatch = useDispatch();
  const { cards, status } = useSelector((state) => state.cards);
  const [open, setOpen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [delOpen, setDelOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCards(listInfo.id));
  }, [dispatch, listInfo.id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelOpen = () => setDelOpen(true);
  const handleDelClose = () => setDelOpen(false);

  const handleCreateCard = (e) => {
    e.preventDefault();
    dispatch(addCard({ cardName, listId: listInfo.id }));
    setCardName("");
    handleClose();
  };

  const handleListDelete = () => {
    dispatch(removeList(listInfo.id));
    handleDelClose();
  };

  const handleTextValue = (e) => {
    setCardName(e.target.value);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          bgcolor: "#ADD8E6",
          fontFamily: "sans-serif",
          m: 2,
          height: "fit-content",
          minWidth: "20vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ml: 3,
            fontWeight: "bold",
            fontFamily: "sans-serif",
          }}
        >
          {listInfo.name}
          <IconButton aria-label="delete" onClick={handleDelOpen}>
            <DeleteIcon />
          </IconButton>
        </Box>

        {status === "loading" ? (
          <Box>Loading Cards...</Box>
        ) : cards.length > 0 ? (
          cards.map((card) => <Cards key={card.id} cardInfo={card} />)
        ) : (
          <Box>No Cards Found</Box>
        )}

        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{ m: 2, width: "85%", color: "black", bgcolor: "#FFF5EE" }}
        >
          + Add a Card
        </Button>
      </Card>

      <DialogBox
        open={open}
        handleClose={handleClose}
        handleSubmit={handleCreateCard}
        textValue={cardName}
        title="Create Card"
        textChange={handleTextValue}
      />

      <DeleteDialog
        handleclose={handleDelClose}
        open={delOpen}
        title="Delete List"
        deleteitem={handleListDelete}
      />
    </>
  );
}

export default Lists;
