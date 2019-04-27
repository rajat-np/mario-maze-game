import React from 'react';
import { Component } from 'react';
import './App.css';
import Board from './components/Board/Board';

class App extends Component {
  state = {
    gridNumber:null
  }
  componentDidMount(){
    const gridNumber = prompt('Enter size of the grid')
    this.setState({
      gridNumber:parseInt(gridNumber)
    })
  }
  render() {
    let { gridNumber } = this.state;
    if ( !gridNumber ) {
      return null
    }
    return (
      <div className="App">
        <Board gridNumber = {gridNumber}/>
      </div>
    );
  }
}

export default App;
