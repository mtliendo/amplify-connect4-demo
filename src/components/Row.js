import { Flex } from '@chakra-ui/layout'
import * as gameStyles from '../Home.module.css'

export const Row = ({ row, play, player1, player2 }) => {
  return (
    <tr>
      {row.map((cell, i) => (
        <Cell
          key={i}
          value={cell}
          columnIndex={i}
          play={play}
          player1={player1}
          player2={player2}
        />
      ))}
    </tr>
  )
}

export const Cell = ({
  value,
  columnIndex,
  play,
  player1 = 1,
  player2 = 2,
}) => {
  let color = 'whiteCircle'
  if (value === player1) {
    color = 'redCircle'
  } else if (value === player2) {
    color = 'yellowCircle'
  }

  return (
    <td>
      <Flex
        justify="center"
        align="center"
        className={gameStyles.gameCell}
        onClick={() => {
          play(columnIndex)
        }}
      >
        <div className={gameStyles[color]}></div>
      </Flex>
    </td>
  )
}
