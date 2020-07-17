import React from 'react';
import logo from './logo.svg';
import './App.css';

import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Poker Hand Simulator
      </header>
      <Game />
    </div>
  );
}

export default App;
