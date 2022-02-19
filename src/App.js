import data from './components/five-character-quatrain.json';
import TopAppBar from './components/TopAppBar';

function App() {
  return (
    <div>
      <TopAppBar />
      {data[0].title}
    </div>
  );
}

export default App;
