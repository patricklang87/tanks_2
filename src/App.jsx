import Counter from './components/counter';
import GameScreen from './components/gameDisplay/gamescreen';

import './App.css'
import { useInitiateGame } from './components/gameDisplay/gameControls';

function App() {
  useInitiateGame();

  return (
    <>
      <h1>Tank you muchly!</h1>
      <Counter />
      <GameScreen />
      
    </>
  )
}

export default App
