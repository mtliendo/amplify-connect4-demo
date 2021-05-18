import { useState } from 'react'
import { Row } from './Row'
import { Heading, VStack } from '@chakra-ui/react'
import { checkForWin } from '../gameUtils'
import { debounce } from 'debounce'
import { Link } from 'react-router-dom'
export const Connect4 = ({
  gameDetails,
  authPlayer,
  onBoardUpdate = () => {},
}) => {
  const [gameMessage, setGameMessage] = useState('')
  const board = JSON.parse(gameDetails.board)
  // triggered when a user clicks a cell
  const debouncedPlay = debounce(
    c => {
      console.log('clicked')
      let playerToggled = false
      if (
        gameDetails.gameStatus !== 'ENDED' &&
        authPlayer === gameDetails.currentPlayer
      ) {
        //check if cell is taken by starting at the bottom row and working up
        for (let r = 5; r >= 0; r--) {
          if (!board[r][c]) {
            board[r][c] = gameDetails.currentPlayer
            playerToggled = true
            break
          }
        }

        // Check status of board
        let result = checkForWin(board)
        switch (result) {
          case `${gameDetails.player1}`:
            setGameMessage(`${gameDetails.player1} (red) wins!`)
            onBoardUpdate({ board, gameStatus: 'ENDED' })
            break
          case `${gameDetails.player2}`:
            setGameMessage(`${gameDetails.player2} (yellow) wins!`)
            onBoardUpdate({ board, gameStatus: 'ENDED' })
            break
          case 'draw':
            setGameMessage('Draw Game!')
            onBoardUpdate({ board, gameStatus: 'ENDED' })
            break
          default:
            if (playerToggled) {
              const nextPlayer =
                gameDetails.currentPlayer === gameDetails.player1
                  ? gameDetails.player2
                  : gameDetails.player1

              onBoardUpdate({ board, currentPlayer: nextPlayer })
            }
            break
        }
      } else if (
        gameDetails.gameStatus !== 'ENDED' &&
        authPlayer !== gameDetails.currentPlayer
      ) {
        return
      } else {
        setGameMessage('Game Over.')
      }
    },
    500,
    true
  )

  return (
    <VStack>
      <table>
        <tbody>
          {board.map((row, i) => (
            <Row
              key={i}
              row={row}
              play={debouncedPlay}
              player1={gameDetails.player1}
              player2={gameDetails.player2}
            />
          ))}
        </tbody>
      </table>

      {gameMessage ? (
        <>
          <Heading size="lg">{gameMessage}</Heading>
          <Link style={{ textDecoration: 'underline' }} to="/lobby">
            return to lobby
          </Link>
        </>
      ) : (
        <Heading>player turn: {gameDetails.currentPlayer}</Heading>
      )}
    </VStack>
  )
}
