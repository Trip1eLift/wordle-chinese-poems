import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { v4 as uuidv4 } from 'uuid';
import progressColor from './progressColor';

export default function ShareBox({gameState, answer, progress, output}) {
    if (gameState === "ongoing")
        return (<></>);

    const greenChar = "🟩";
    const yelloChar = "🟨";
    const blackChar = "⬛";

    //const progress = {attempts: ["寥落古行宮", "寥落古行宮", "寥落古行宮", "寥落古行宮", "寥落古行宮", "寥落古行宮"]};

    const progColor = new progressColor(answer);
    const result = progColor.resultDisplay(progress, output);

    return (
        <Box sx={{ flexGrow: 1}} style={{marginTop: "5rem", marginBottom: "5rem"}}>
            {result.map((row) =>
                <Grid container key={uuidv4()} justifyContent="center" marginTop="0.2rem">
                    <Grid item><div>{row}</div></Grid>
                </Grid>
            )}
        </Box>
    )
    
}