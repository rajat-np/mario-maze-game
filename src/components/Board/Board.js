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
            isFinished:false,
            gridNumber:this.props.gridNumber
        }  
        this.listenArrowKeys = this.listenArrowKeys.bind(this);
    }

    listenArrowKeys(e){
        let { marioPosition, grid, totalKeyStrokes, gridNumber } = this.state;
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
        if ( marioPosition.r === gridNumber-1 ){
            arrowDownDisable = true
        }
        if ( marioPosition.c === 0 ){
            arrowLeftDisable = true
        }        
        if ( marioPosition.c === gridNumber-1 ){
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
    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    componentDidMount() {

        let { gridNumber } = this.state;


        document.addEventListener("keydown", this.listenArrowKeys, false);


        let zeroArray = Array(gridNumber*gridNumber-gridNumber).fill(0);
        let oneArray = Array(gridNumber).fill(1);
        let nonShuffledArray = oneArray.concat(zeroArray);

        let shuffledArray = this.shuffleArray(nonShuffledArray);
        console.log(shuffledArray);

        let initialGrid = [];
        while(shuffledArray.length) initialGrid.push(shuffledArray.splice(0,gridNumber));

        let initialMarioPosition = {
            r:Math.floor(gridNumber/2),
            c:Math.floor(gridNumber/2)
        }
        this.setState({
            grid:initialGrid,
            marioPosition:initialMarioPosition
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