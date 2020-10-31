import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DialogBox(props) {
  const { open, handleClose, addNode, type, value } = props;

  const [filenode, setFileNode] = useState({
    name: "",
    type: "file",
    status: "true"
  });
  const [foldernode, setFolderNode] = useState({
    name: "",
    type: "folder",
    status: "true",
    content: []
  });

  function handleChange(event) {
    const { value } = event.target;
    if (type === "file") {
      setFileNode((prevNote) => {
        return {
          ...prevNote,
          name: value
        };
      });
    } else if (type === "folder") {
      setFolderNode((prevNote) => {
        return {
          ...prevNote,
          name: value
        };
      });
    }
  }

  function createNode(event) {
    if (type === "file") {
      addNode(filenode);
      setFolderNode({
        name: "",
        type: "file",
        status: "true"
      });
    } else if (type === "folder") {
      addNode(foldernode);
      setFolderNode({
        name: "",
        type: "folder",
        status: "true",
        contents: []
      });
    }
    handleClose();
    event.preventDefault();
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New {type}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id={type}
            label={type}
            type="text"
            onChange={handleChange}
            value={type === "file" ? filenode.name : foldernode.name}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createNode} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
