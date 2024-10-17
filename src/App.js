import React from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Simple React Golf Game</h1>
      <GameBoard />
    </div>
  );
}

export default App;
