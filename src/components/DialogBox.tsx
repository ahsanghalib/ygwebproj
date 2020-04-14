import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

interface Props {
  title: string;
  content: string;
  open: boolean;
  onCancel: () => void;
  onOkay: () => void;
}

function DialogBox(props: Props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onOkay} color="primary">
          Agreed
        </Button>
        <Button onClick={props.onCancel} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogBox;
