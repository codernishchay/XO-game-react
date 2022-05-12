import React from "react";
import { useState, useEffect } from "react";
import Board from "./components/Board";
import Game from "./components/Game";
import { calculateWinner } from "./helper";
const App = ()=>{
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);
    const xO = xIsNext ? "X" : "O";
  
  
    const handleClick = (i) => {
      const historyPoint = history.slice(0, stepNumber + 1);
      const current = historyPoint[stepNumber];
      const squares = [...current];
      
      if (winner || squares[i]) return;
      
      squares[i] = xO; 
      setHistory([...historyPoint, squares]);
      setStepNumber(historyPoint.length);
      setXisNext(!xIsNext);
    };
  
    const jumpTo = (step) => {
      setStepNumber(step);
      setXisNext(step % 2 === 0);
    };
  
    const renderMoves = () =>
      history.map((_step, move) => {
        const destination = move ? `Go to move #${move}` : "Go to start";
  
        return (
          <li key={move}>
            <button className="history-btn" onClick={() => jumpTo(move)}>{destination}</button>
          </li>
        );
      });

      const createNew =()=>{
           setHistory([Array(9).fill(null)]); 
           setStepNumber(0); 
           setXisNext(false); 
        }
    return (
        <div class="container App">
        <div class="history">
        <div className="result">
          <h3>History</h3>
          {renderMoves()}
        </div>

        </div>
        <div class="boardArea ">
            
        <Board squares={history[stepNumber]} onClick={handleClick} />

        </div>
        <div class="headerArea result">
             <h1>X  O Game </h1>
        </div>
        <div class="newgameButton result">
        <div className="result">{winner ? "Winner: " + winner : "Next Player: " + xO}</div> 
        </div>
        <div class="winnerDeclare">
        <div
        onClick={createNew} 
        className="result">
            New Game</div>
   
        </div>
      </div>
    )
}

export default App ; 