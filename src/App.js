import React from 'react';
import './App.css';
import Board from './components/Board/Board';

function App() {

  return (
    <div className="App">
      <Board gridNumber = {10}/>
    </div>
  );
}

export default App;
