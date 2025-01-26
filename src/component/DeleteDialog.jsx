import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";


function DeleteDialog({ handleclose, open, title, deleteitem }) {
  return (
    <Dialog onClose={handleclose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleclose}
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
        <Typography gutterBottom>Are you sure you want to delete?</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={deleteitem}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onConfirm: PropTypes.func,
  deleteitem: PropTypes.func.isRequired,
};

export default DeleteDialog;
