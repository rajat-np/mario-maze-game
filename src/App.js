import React from 'react';
import './App.css';
import Board from './components/Board/Board';

function App() {

  return (
    <div className="App">
      <Board gridNumber = {9}/>
    </div>
  );
}

function randomGrid(size){

  return new Array(size).fill(null).map(item =>(new Array(size).fill(null)))
}
export default App;
