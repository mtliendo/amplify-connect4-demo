import { useReducer } from 'react'
import { Row } from './Row'
import { Box, Button, Heading, VStack } from '@chakra-ui/react'
import { checkForWin, deepCloneBoard, generateNewBoard } from '../gameUtils'
import { debounce } from 'debounce'

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'newGame':
      return {
        ...initialGameState,
        board: action.board,
      }
    case 'togglePlayer':
      return {
        ...state,
        currentPlayer: action.nextPlayer,
        board: action.board,
      }
    case 'endGame':
      return {
        ...state,
        gameOver: true,
        message: action.message,
        board: action.board,
      }
    case 'updateMessage':
      return {
        ...state,
        message: action.message,
      }
    default:
      throw Error(`Action "${action.type}" is not a valid action.`)
  }
}
const initialGameState = {
  player1: 1,
  player2: 2,
  currentPlayer: 1,
  board: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ],
  gameOver: false,
  message: '',
}
export const Connect4 = () => {
  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    initialGameState
  )

  // triggered when a user clicks a cell
  const debouncedPlay = debounce(
    c => {
      if (!gameState.gameOver) {
        let board = deepCloneBoard(gameState.board)
        let playerToggled = false
        //check if cell is taken by starting at the bottom row and working up
        for (let r = 5; r >= 0; r--) {
          if (!board[r][c]) {
            board[r][c] = gameState.currentPlayer
            playerToggled = true
            break
          }
        }

        // Check status of board
        let result = checkForWin(board)
        if (result === gameState.player1) {
          dispatchGameState({
            type: 'endGame',
            message: 'Player1 (red) wins!',
            board,
          })
        } else if (result === gameState.player2) {
          dispatchGameState({
            type: 'endGame',
            message: 'Player2 (yellow) wins!',
            board,
          })
        } else if (result === 'draw') {
          dispatchGameState({
            type: 'endGame',
            message: 'Draw Game!',
            board,
          })
        } else {
          //only toggle the player if the user was able to put  a token somewhere
          if (playerToggled) {
            const nextPlayer =
              gameState.currentPlayer === gameState.player1
                ? gameState.player2
                : gameState.player1

            dispatchGameState({ type: 'togglePlayer', nextPlayer, board })
          }
        }
      }
      // it's gameover and a user clicked a cell
      else {
        dispatchGameState({
          type: 'updateMessage',
          message: 'Game Over. Please start a new game.',
        })
      }
    },
    250,
    true
  )

  return (
    <VStack>
      <table>
        <tbody>
          {gameState.board.map((row, i) => (
            <Row
              key={i}
              row={row}
              play={debouncedPlay}
              player1={gameState.player1}
              player2={gameState.player2}
            />
          ))}
        </tbody>
      </table>
      <Box pb="6">
        <Button
          colorScheme="teal"
          rounded="full"
          onClick={() => {
            dispatchGameState({ type: 'newGame', board: generateNewBoard() })
          }}
        >
          New Game
        </Button>
      </Box>

      <Heading>{gameState.message}</Heading>
    </VStack>
  )
}
