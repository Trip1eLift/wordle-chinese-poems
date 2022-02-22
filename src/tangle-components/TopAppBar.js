import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopAppBar({translate, setTranslate}) {
  function handleLanguage(event) {
    setTranslate(translate === false);
  }
  function languageInnerText() {
    if (translate)
      return "繁體"; 
    else
      return "简体";
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:"grey"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1 }}>
            <div style={{cursor:"default"}}>Tangle: A Wordle game for Tang Poetry</div>
          </Typography>
          <Button color="inherit" onClick={handleLanguage}>{languageInnerText()}</Button>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}