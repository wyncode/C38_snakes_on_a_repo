import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Typography, TextField } from '@material-ui/core';

/* From Materials UI Library to control Modal Style */
function getModalStyle() {
  const top = 30;
  const left = 30;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '20px'
  }
}));

/* Modal Component from Material UI */
const MailModal = ({ role, userEmail }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h3">Contact Me</Typography>
      <form action={`mailto:${userEmail}`} method="POST">
        <TextField
          variant="outlined"
          name="subject"
          label="Subject"
          type="text"
        />
        <TextField
          style={{ marginTop: '20px' }}
          variant="outlined"
          name="body"
          multiline
          rows="5"
          label="type your message here..."
        />
        <Button type="submit" className="header-card-btn">
          Send
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <Button variant="contained" id="btn1" onClick={handleOpen}>
        {role === 'user' ? 'Contact' : 'Share'}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="email form"
        aria-describedby="email form"
      >
        {body}
      </Modal>
    </>
  );
};

export default MailModal;
