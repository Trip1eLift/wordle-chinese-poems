import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function ShareBox({gameState, answer, progress}) {
    if (gameState === "ongoing")
        return (<></>);

    const greenChar = "🟩";
    const yelloChar = "🟨";
    const blackChar = "⬛";

    //const progress = {attempts: ["寥落古行宮", "寥落古行宮", "寥落古行宮", "寥落古行宮", "寥落古行宮", "寥落古行宮"]};

    let result = ["Tangle beta"];
    for (let row = 0; row < 6; row++) {
        let rowResult = "";
        if (progress.attempts[row] === "")
            break;
        for (let col=0; col < 5; col++) {
            if (progress.attempts[row][col] === answer[col])
                rowResult = rowResult + greenChar;
            else {
                let hit = false;
                for (let i=0; i<5; i++) {
                    if (progress.attempts[row][col] === answer[i])
                        hit = true;
                }
                if (hit)
                    rowResult = rowResult + yelloChar;
                else
                    rowResult = rowResult + blackChar;
            }
        }
        result.push(rowResult);
    }

    return (
        <Box sx={{ flexGrow: 1}} style={{marginTop: "5rem", marginBottom: "5rem"}}>
            {result.map((row) =>
                <Grid container justifyContent="center" marginTop="0.2rem">
                    <Grid item><div>{row}</div></Grid>
                </Grid>
            )}
        </Box>
    )
    
}