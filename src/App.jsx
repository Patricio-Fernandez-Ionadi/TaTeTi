import { useState } from "react"
import confeti from 'canvas-confetti'
import './App.css'

import { INITIAL_BOARD, TURNS } from "./constants"

import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { resetGameStorage, saveGameStorage } from "./storage/localStorage"

import { WinnerModal } from "./components/WinnerModal"
import { TurnMarker } from "./components/TurnMarker"
import { Board } from "./components/Board"

function App() {

  const [board, setBoard] = useState(()=>{
    const boardFromLocalStorage = window.localStorage.getItem('board')

    if (boardFromLocalStorage) return JSON.parse(boardFromLocalStorage)
    return INITIAL_BOARD
  })

  const [turn, setTurn] = useState(()=>{
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  })

  // null no hay ganador - false empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(INITIAL_BOARD)
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) => {

    // Si el tablero tiene algo
    if (board[index] || winner) return

    // Actualizar Tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Cambiar Turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //guardar partida
    saveGameStorage({
      board: newBoard,
      turn: newTurn
    })

    // Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confeti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false) // empate
    }
    
  }

  return (
    <main className="board">
      <h1>Ta Te Ti</h1>
      <button onClick={resetGame}>Empezar</button>
      
      <Board board={board} updateBoard={updateBoard} />

      <TurnMarker turn={turn} />

      <WinnerModal winner={winner} actionbutton={resetGame} />
    </main>
  )
}

export default App
