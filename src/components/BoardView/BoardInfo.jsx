import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Lists from "../ListView/Lists";
import DialogBox from "../DialogBox";
import { fetchLists, addList } from "../../store/listsSlice";
import { fetchBoards } from "../../store/boardsSlice";

function BoardInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { lists, status } = useSelector((state) => state.lists);
  const { boards } = useSelector((state) => state.boards);
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");

  useEffect(() => {
    dispatch(fetchLists(id));
    dispatch(fetchBoards());
  }, [dispatch, id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleListName = (e) => {
    setListName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addList({ listName, boardId: id }));
    setListName("");
    handleClose();
  };

  const boardName = boards.find((board) => board.id === id)?.name || "";

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
        {boardName}
      </Box>
      <Box
        component="span"
        sx={{ display: "flex", overflowX: "scroll", height: "100vh" }}
      >
        <Box sx={{ display: "flex" }}>
          {status === "loading" ? (
            <Box sx={{ width: "10vw", m: 2 }}>Loading Lists...</Box>
          ) : lists.length > 0 ? (
            lists.map((list) => <Lists key={list.id} listInfo={list} />)
          ) : (
            <Box sx={{ width: "10vw", m: 2 }}>No Lists Found</Box>
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
