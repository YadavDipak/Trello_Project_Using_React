import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCards, createCards, deleteList } from "../../services/FetchApi";
import Cards from "../CardView/Cards";
import DialogBox from "../DialogBox";
import { Box, Card, Button } from "@mui/material";
import DeleteDialog from "../DeleteDialog";

function Lists({ listInfo, handleListChange }) {
  const [cardsData, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [delOpen, setDelOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelOpen = () => setDelOpen(true);

  const handleDelClose = () => setDelOpen(false);

  useEffect(() => {
    getCards(listInfo.id)
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        throw new Error(`Failed to fetch cards: ${err.message}`);
      });
  }, [listInfo.id]);

  const handleCreateCard = (e) => {
    e.preventDefault();
    createCards(cardName, listInfo.id)
      .then((newCard) => {
        setCards([...cardsData, newCard]);
        setCardName("");
        handleClose();
      })
      .catch((err) => {
        throw new Error(`Failed to create card: ${err.message}`);
      });
  };

  const handleListDelete = () => {
    handleDelClose();
    deleteList(listInfo.id).then((data) => {
      handleListChange(data);
    });
  };

  function setCardsData(id) {
    let results = cardsData.filter((cards) => cards.id !== id);
    setCards(results);
  }

  const handleTextValue = (e) => {
    setCardName(e.target.value);
  };

  return (
    <>
      <Card
        key={listInfo}
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

        {cardsData.map((card) => (
          // eslint-disable-next-line react/jsx-key
          <Cards handleCards={setCardsData} cardInfo={card} />
        ))}

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
        title={"  Delete List"}
        deleteitem={handleListDelete}
      />
    </>
  );
}

export default Lists;
