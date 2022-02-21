import React from 'react';
import TopAppBar from './components/TopAppBar';
import WordMatrix from './components/WordMatrix';
import WordBank from './components/WordBank';
import Controller from './components/Controller';
import ShareBox from './components/ShareBox';
import problenGenerator from './components/problemGenerator';

function App() {

  const [progress, setProgress] = React.useState({row: 0, attempts: ["", "", "", "", "", ""]});
  const [gameState, setGameState] = React.useState("ongoing"); // ongoing, win, lose
  const [problemGeneratorStatic, ] = React.useState(new problenGenerator(1));
  //const wordPool = "寥落古行宮宮花寂寞紅白頭宮女在閒坐說玄宗白日依山盡黃河入海流";
  //const answer = "寥落古行宮";
  const [answer, wordPool] = problemGeneratorStatic;
  //console.log(answer, wordPool);

  // Force re-render tech
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);


  return (
    <div>
      <TopAppBar />
      <WordMatrix progress={progress} answer={answer} />
      <WordBank wordPool={wordPool} progress={progress} setProgress={setProgress} forceUpdate={forceUpdate} gameState={gameState} />
      <Controller progress={progress} setProgress={setProgress} forceUpdate={forceUpdate} gameState={gameState} setGameState={setGameState} answer={answer} />
      <ShareBox gameState={gameState} answer={answer} progress={progress}/>
    </div>
  );
}

export default App;
