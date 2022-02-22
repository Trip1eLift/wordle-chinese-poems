import * as React from 'react';
import Grid from '@mui/material/Grid';
import WordSquare from './WordSquare';

export default function WordRow({row, progress, answer, translate}) {
    const attempt = progress.attempts[row];
    
    return (
        <Grid container justifyContent="center" spacing={1} marginTop="0.5rem">
            <Grid item><WordSquare column={0} attempt={attempt} answer={answer} currentRow={row} progressRow={progress.row} translate={translate}/></Grid>
            <Grid item><WordSquare column={1} attempt={attempt} answer={answer} currentRow={row} progressRow={progress.row} translate={translate}/></Grid>
            <Grid item><WordSquare column={2} attempt={attempt} answer={answer} currentRow={row} progressRow={progress.row} translate={translate}/></Grid>
            <Grid item><WordSquare column={3} attempt={attempt} answer={answer} currentRow={row} progressRow={progress.row} translate={translate}/></Grid>
            <Grid item><WordSquare column={4} attempt={attempt} answer={answer} currentRow={row} progressRow={progress.row} translate={translate}/></Grid>
        </Grid>
    );
}