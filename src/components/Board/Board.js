import React, { Component } from 'react';
import Square from '../Square/Square';
import './Board.css'

class Board extends Component {

    constructor(props){
        super(props);
        this.state = {
            grid:[],
            marioPosition:{},
            totalKeyStrokes:0,
            isFinished:false
        }  
        this.listenArrowKeys = this.listenArrowKeys.bind(this);
    }

    listenArrowKeys(e){
        let { marioPosition, grid, totalKeyStrokes } = this.state;
        // console.log(grid);

        grid[marioPosition.r][marioPosition.c] = 0

        this.setState({
            grid
        })

        let arrowDownDisable = false,
            arrowLeftDisable = false,
            arrowRightDisable = false,
            arrowUpDisable  = false;

        if ( marioPosition.r === 0 ){
            arrowUpDisable = true
        }
        if ( marioPosition.r === 9 ){
            arrowDownDisable = true
        }
        if ( marioPosition.c === 0 ){
            arrowLeftDisable = true
        }        
        if ( marioPosition.c === 9 ){
            arrowRightDisable = true
        }
        if ( e.code === "ArrowUp" && !arrowUpDisable ){
            this.setState({
                marioPosition:{
                    ...marioPosition,
                    r:marioPosition.r-1,
                    totalKeyStrokes:totalKeyStrokes+1
                }
            })
        }
        if ( e.code === "ArrowDown" && !arrowDownDisable ){
            this.setState({
                marioPosition:{
                    ...marioPosition,
                    r:marioPosition.r+1,
                    totalKeyStrokes:totalKeyStrokes+1
                }
            })
        }        
        if ( e.code === "ArrowLeft" && !arrowLeftDisable ){
            this.setState({
                marioPosition:{
                    ...marioPosition,
                    c:marioPosition.c-1,
                    totalKeyStrokes:totalKeyStrokes+1
                }
            })
        }        
        if ( e.code === "ArrowRight" && !arrowRightDisable ){
            this.setState({
                marioPosition:{
                    ...marioPosition,
                    c:marioPosition.c+1,
                    totalKeyStrokes:totalKeyStrokes+1
                }
            })
        }
        // let isFinished = this.checkIfFinished();

        // if ( isFinished ){
        //     alert(`You took ${totalKeyStrokes} key presses to finish the game`)
        // }
    }

    checkIfFinished(){
        let { grid } = this.state;
        let gridNumber = grid[0].length
        for ( var i = 0; i < gridNumber ; i++){
            for ( var j = 0; j < gridNumber ; j++){
                if ( grid[i][j] === 1)
                    return false
            }
        }
        return true
    }

    componentDidMount() {

        document.addEventListener("keydown", this.listenArrowKeys, false);

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

    componentWillUnmount(){
        document.removeEventListener("keydown", this.listenArrowKeys, false);
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
        let { marioPosition } = this.state;
        return (
            <div className="table-container">
                    <table onKeyPress={(e) => console.log(e.key)} className="table">
                    <tbody>
                    {this.rows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Board;