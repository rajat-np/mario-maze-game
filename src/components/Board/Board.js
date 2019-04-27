import React, { Component } from 'react';
import Square from '../Square/Square';
import './Board.css'

class Board extends Component {

    constructor(props){
        super(props);
        this.state = {
            grid:[],
            marioPosition:{}
        }  
    }

    componentDidMount() {
        let gridNumber = this.props.gridNumber
        let grid = Array(gridNumber).fill(null).map(x=>Array(gridNumber).fill(null))
        for ( var i = 0; i < gridNumber ; i++){
            for ( var j = 0; j < gridNumber ; j++){
                grid[i][j] = this.zeroOrOne()
            }
        }
        let marioPosition = {
            r:Math.floor(gridNumber/2),
            c:Math.floor(gridNumber/2)
        }
        this.setState({
            grid,
            marioPosition
        })
    }
    
    
    zeroOrOne = () => {
        let randomNumber = Math.floor(Math.random()*100);

        if (randomNumber % 10 === 0){
            return 1
        }
        return 0
    }

    rows = () => this.state.grid.map((r, i) => 
                    <tr key={"row_"+i}>
                        {r.map((d, j) => {
                            let marioSquare = false
                            if ( this.state.marioPosition.r === i && this.state.marioPosition.c === j ){
                                marioSquare = true
                            }
                            return <Square
                                key={i+"_"+j}
                                zeroOne={this.state.grid[i][j]}
                                marioSquare = {marioSquare}/>
                        
                        })}
                    </tr>)
    render() {
        let { grid } = this.state;
        console.log(grid)
        return (
            <div className="table-container">
                <table className="table">
                    <tbody>
                    {this.rows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Board;