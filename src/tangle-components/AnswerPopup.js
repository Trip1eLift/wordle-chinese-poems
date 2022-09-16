import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { v4 as uuidv4 } from 'uuid';
import data from './5word4line.json';
import { Converter } from 'opencc-js';
const converter = Converter({ from: 'tw', to: 'cn' });

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AnswerPopup({gameState, answer, translate}) {
    const [open, setOpen] = React.useState(false);
    const [justOver, setJustOver] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (gameState !== "ongoing" && justOver === false) {
        setJustOver(true);
        setOpen(true);
    }

    function locateAnswer(answer, data) {
        let Poem = {title: "", author: "", lyrics: ["", "", "", ""]};
        data.forEach((poem) => {
            poem.lyrics.forEach((line) => {
                if (answer === line) {
                    Poem = poem;
                }
            });
        });
        return Poem;
    }
    let Poem = locateAnswer(answer, data);
    if (translate) {
        Poem.title = converter(Poem.title);
        Poem.author = converter(Poem.author);
        for (let i=0;i<Poem.lyrics.length; i++) {
            Poem.lyrics[i] = converter(Poem.lyrics[i]);
        }
    }

    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {"答案: " + answer}
            </Typography>
                <div style={{marginTop:"0.5rem", marginBottom:"0.5rem"}}>
                    <span>{Poem.title}</span>
                    <span>&ensp;&ensp;</span>
                    <span>{Poem.author}</span>
                </div>
                {Poem.lyrics.map((line) => 
                    <div key={uuidv4()}>{line}</div>
                )}
            </Box>
        </Modal>
        </div>
    );
}