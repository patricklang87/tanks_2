import { useEffect } from 'react';

import Counter from './components/counter';
import GameScreen from './components/gameDisplay/gamescreen';
import './App.css'

function App() {
  useEffect(() => {}, []);

  return (
    <>
      <h1>Tank you muchly!</h1>
      <Counter />
      <GameScreen />
      
    </>
  )
}

export default App
