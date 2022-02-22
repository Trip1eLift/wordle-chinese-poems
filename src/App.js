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
  const seed = Math.floor(Math.random() * 10);
  const [problemGeneratorStatic, ] = React.useState(new problenGenerator(seed));
  //const wordPool = "寥落古行宮宮花寂寞紅白頭宮女在閒坐說玄宗白日依山盡黃河入海流";
  //const answer = "寥落古行宮";
  const [answer, wordPool] = problemGeneratorStatic;
  React.useEffect(() => {
    // Only for beta debugging
    console.log(answer);
  }, []);

  // Force re-render tech
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const outputMessage = "Tangle beta, seed: " + seed.toString();
  return (
    <div>
      <TopAppBar />
      <WordMatrix progress={progress} answer={answer} />
      <WordBank wordPool={wordPool} progress={progress} setProgress={setProgress} answer={answer} forceUpdate={forceUpdate} gameState={gameState} />
      <Controller progress={progress} setProgress={setProgress} forceUpdate={forceUpdate} gameState={gameState} setGameState={setGameState} answer={answer} />
      <ShareBox gameState={gameState} answer={answer} progress={progress} output={outputMessage}/>
    </div>
  );
}

export default App;
