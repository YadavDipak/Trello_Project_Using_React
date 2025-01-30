import React, { useEffect } from "react";
import { Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Boards from "./Boards";
import DialogBox from "../DialogBox";
import { fetchBoards, addBoard } from "../../store/boardsSlice";

function Content() {
  const dispatch = useDispatch();
  const { boards, status } = useSelector((state) => state.boards);
  const [open, setOpen] = React.useState(false);
  const [boardName, setBoard] = React.useState("");

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateBoard = (e) => {
    e.preventDefault();
    dispatch(addBoard(boardName));
    setBoard("");
    handleClose();
  };

  const handleChange = (e) => {
    setBoard(e.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          m: 2,
          pt: 4,
          fontFamily: "sans-serif",
        }}
      >
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{
            backgroundColor: "#008080",
            borderRadius: 3,
            width: 200,
            m: 4,
            height: 100,
          }}
        >
          Create Board
        </Button>

        <DialogBox
          open={open}
          handleClose={handleClose}
          handleSubmit={handleCreateBoard}
          textValue={boardName}
          title="Create Board"
          textChange={handleChange}
        />

        {status === "loading" ? (
          <Box>Loading...</Box>
        ) : boards.length > 0 ? (
          boards.map((item) => <Boards key={item.id} boardInfo={item} />)
        ) : (
          <Box
            sx={{
              backgroundColor: "#6495ED",
              height: 100,
              width: 200,
              borderRadius: 2,
              m: 4,
              color: "#ffff",
              alignContent: "center",
              textAlign: "center",
            }}
          >
            No Boards Found
          </Box>
        )}
      </Box>
    </>
  );
}

export default Content;
