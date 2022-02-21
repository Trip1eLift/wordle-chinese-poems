import * as React from 'react';
import WordRow from './WordRow';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function WordMatrix({progress, answer}) {

    return (
        <Box sx={{ flexGrow: 1}} style={{marginTop: "5rem"}}>
            <WordRow row={0} progress={progress} answer={answer}/>
            <WordRow row={1} progress={progress} answer={answer}/>
            <WordRow row={2} progress={progress} answer={answer}/>
            <WordRow row={3} progress={progress} answer={answer}/>
            <WordRow row={4} progress={progress} answer={answer}/>
            <WordRow row={5} progress={progress} answer={answer}/>
        </Box>
    )
}