import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { marked } from 'marked';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  overflow:'scroll',
  transform: 'translate(-50%, -40%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 4,
};

export default function About({open, setOpen}) {
  const [aboutText, setAboutText] = React.useState("");
  function handleClose(e) {
    setOpen(false);
  }

  React.useEffect(() => {
    if (localStorage.getItem("about"))
      setAboutText(localStorage.getItem("about"));
    axios.get("https://raw.githubusercontent.com/Trip1eLift/About/main/README.md")
      .then((res) => {
        setAboutText(res.data);
        localStorage.setItem("about", res.data);
      })
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="about-modal-title"
      aria-describedby="about-modal-description"
      style={{overflow: "scroll"}}
    >
      <Box sx={style}>
        <div dangerouslySetInnerHTML={{ __html: marked.parse(aboutText) }} />
      </Box>
    </Modal>
  );
}