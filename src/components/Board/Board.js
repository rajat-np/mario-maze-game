import React, { Component } from 'react';
import Square from '../Square/Square';
import './Board.css'

class Board extends Component {
    state = {
        grid:Array(10).fill(0).map(x=>Array(10).fill("+")),
    }

    render() {
        const rows = this.state.grid.map((r, i) => 
            <tr key={"row_"+i}>
              {r.map((d, j) => 
                <Square
                  key={i+"_"+j}
                    />
              )}
              </tr>)
        return (
            <div className="table-container">
                <table className="table" cellSpacing='4'>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Board;