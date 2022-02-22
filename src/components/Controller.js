import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Controller({progress, setProgress, gameState, setGameState, answer, forceUpdate}) {
    
    const controlClickableStyle = {
        fontSize: "2rem",
        paddingTop: "0.3rem",
        paddingBottom: "0.6rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        borderRadius: "7px",
        cursor: "pointer",
        width: "20rem",
        textAlign: "center"
    }
    
    function handleDelete(event) {
        if (gameState !== "ongoing")
            return;
        const row = progress.row;
        const length = progress.attempts[row].length
        if (length > 0) {
            let tempProgress = progress;
            tempProgress.attempts[row] = tempProgress.attempts[row].substring(0, length - 1);
            setProgress(tempProgress);
            forceUpdate();
        }
    }

    function handleSubmit(event) {
        if (gameState !== "ongoing")
            return;
        const row = progress.row;
        if (progress.attempts[row].length === 5) {
            let nextState = "ongoing";
            if (progress.attempts[row] === answer)
                nextState = "win";
            else if (row === 5)
                nextState = "lose";
            //console.log(nextState);
            setGameState(nextState);
            
            let tempProgress = progress;
            tempProgress.row++;
            setProgress(tempProgress);
            forceUpdate();
        }
    }

    return (
        <Box sx={{ flexGrow: 1}} style={{marginBottom: "1rem"}}>
            <Grid container justifyContent="center" spacing={1} marginTop="0.2rem">
                <Grid item><div style={{...controlClickableStyle, backgroundColor:"#FF7F7F"}} onClick={handleDelete}>刪除</div></Grid>
                <Grid item><div style={{...controlClickableStyle, backgroundColor:"#90EE90"}} onClick={handleSubmit}>確定</div></Grid>
            </Grid>
        </Box>
    )
}