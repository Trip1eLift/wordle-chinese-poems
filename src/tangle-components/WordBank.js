import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { v4 as uuidv4 } from 'uuid';
import progressColor from './progressColor';
import { Converter } from 'opencc-js';
const converter = Converter({ from: 'tw', to: 'cn' });

export default function WordBank({wordPool, progress, setProgress, answer, gameState, forceUpdate, translate}) {
    
    const wordClickableStyle = {
        fontSize: "2rem",
        paddingTop: "0.3rem",
        paddingBottom: "0.6rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        borderRadius: "7px",
        cursor: "pointer"
    }

    function handleSelectWord(event) {
        //console.log(progress.attempts);
        //console.log(event.target.innerText);
        if (gameState !== "ongoing")
            return;
        const row = progress.row;
        if (progress.attempts[row].length >= 5)
            return;
        let tempProgress = progress;
        progress.attempts[row] = progress.attempts[row] + event.target.id;
        setProgress(tempProgress);
        forceUpdate();
    }
    
    let sub1 = [];
    let sub2 = [];
    let sub3 = [];
    for (let i = 0; i < 10; i++)
        sub1.push(wordPool[i]);
    for (let i = 10; i < 20; i++)
        sub2.push(wordPool[i]);
    for (let i = 20; i < 30; i++)
        sub3.push(wordPool[i]);

    const progColor = new progressColor(answer);
    function trans(word) {
        if (translate)
            return converter(word);
        else
            return word;
    }

    return (
        <Box sx={{ flexGrow: 1}} style={{marginTop: "1rem"}}>
            <Grid container justifyContent="center" spacing={1} marginTop="0.2rem">
                {sub1.map((word) => 
                    <Grid item key={uuidv4()}><div style={{...wordClickableStyle, backgroundColor: progColor.getBacktrackColor(word, progress)}} onClick={handleSelectWord} id={word}>{trans(word)}</div></Grid>
                )}
            </Grid>
            <Grid container justifyContent="center" spacing={1} marginTop="0.2rem">
                {sub2.map((word) => 
                    <Grid item key={uuidv4()}><div style={{...wordClickableStyle, backgroundColor: progColor.getBacktrackColor(word, progress)}} onClick={handleSelectWord} id={word}>{trans(word)}</div></Grid>
                )}
            </Grid>
            <Grid container justifyContent="center" spacing={1} marginTop="0.2rem">
                {sub3.map((word) => 
                    <Grid item key={uuidv4()}><div style={{...wordClickableStyle, backgroundColor: progColor.getBacktrackColor(word, progress)}} onClick={handleSelectWord} id={word}>{trans(word)}</div></Grid>
                )}
            </Grid>
        </Box>
    )
}