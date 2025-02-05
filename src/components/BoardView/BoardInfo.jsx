import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { getAllBoard, createLists, FetchApi } from "../../services/FetchApi";
import Lists from "../ListView/Lists";
import DialogBox from "../DialogBox";

function BoardInfo() {
  const { id } = useParams();
  const [lists, setLists] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");

  useEffect(() => {
    FetchApi(id)
      .then((data) => {
        setLists(data);
      })
      .catch((err) => {
        throw new Error(`Failed to fetch lists: ${err.message}`);
      });

    getAllBoard()
      .then((boards) => {
        const board = boards.find((board) => board.id === id);
        setBoardName(board.name);
      })
      .catch((err) => {
        throw new Error(`Failed to fetch board details: ${err.message}`);
      });
  }, [id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleListName(e) {
    setListName(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    createLists(listName, id)
      .then((data) => {
        setLists([...lists, data]);
      })
      .catch((err) => {
        throw new Error(`Failed to create list: ${err.message}`);
      });
    handleClose();
    setListName("");
  }

  function listDisposed(deletedlist) {
    const filteredLists = lists.filter((list) => list.id !== deletedlist.id);
    setLists(filteredLists);
  }

  return (
    <>
      <Box
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          padding: 2,
          marginLeft: 0.5,
        }}
      >
        {" "}
        {boardName}{" "}
      </Box>
      <Box
        component="span"
        sx={{ display: "flex", overflowX: "scroll", height: "100vh" }}
      >
        <Box sx={{ display: "flex" }}>
          {lists.length > 0 ? (
            lists.map((list) => (
              <Lists
                key={list.id}
                handleListChange={listDisposed}
                listInfo={list}
              />
            ))
          ) : (
            <Box sx={{ width: "10vw", m: 2 }}>Loading Lists...</Box>
          )}

          <Button
            onClick={handleOpen}
            variant="outlined"
            sx={{
              m: 2,
              width: "20vw",
              height: "10vh",
              color: "#ffff",
              backgroundColor: "#4682B4",
              border: "2px solid #f0f0f0",
              fontWeight: "bold",
            }}
          >
            + Add a List
          </Button>
        </Box>
      </Box>

      <DialogBox
        open={open}
        handleClose={handleClose}
        handleSubmit={handleFormSubmit}
        textValue={listName}
        title="Create List"
        textChange={handleListName}
      />
    </>
  );
}

export default BoardInfo;
