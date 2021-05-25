import API from '@aws-amplify/api'
import { Avatar, AvatarGroup } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Container } from '@chakra-ui/layout'
import { Flex, HStack, Text } from '@chakra-ui/layout'
import { useHistory } from 'react-router-dom'
import { updateGame } from '../graphql/mutations'

const UserTable = ({ gameList, handleGameUpdate }) => {
  const history = useHistory()

  const handleGameConnection = async game => {
    const { data } = await API.graphql({
      query: updateGame,
      variables: { input: { id: game.id, gameStatus: 'LOBBY_IN_PROGRESS' } },
    })

    const updatedGame = data.updateGame
    history.push(`/game/connect4/${game.id}`, { currentGame: updatedGame })
  }

  const removeGame = gameId => {
    handleGameUpdate(gameId)
  }

  return (
    <Flex w="40vw" minW="425px" direction="column">
      {gameList.map(game => {
        return (
          <Flex
            key={game.id}
            border="3px solid orange"
            rounded="sm"
            p="2"
            mb="3"
          >
            <HStack flex="1">
              <AvatarGroup>
                <Avatar name={game.player1} />
                <Avatar name={game.player2} />
              </AvatarGroup>
              <Button variant="link">{game.player1}</Button>
              <Text>vs</Text>
              <Button variant="link">{game.player2}</Button>
            </HStack>
            <Flex wrap="wrap">
              <Button
                size="lg"
                colorScheme="teal"
                variant="link"
                p="2"
                type="submit"
                onClick={e => {
                  e.preventDefault()
                  handleGameConnection(game)
                }}
              >
                {game.gameStatus === 'LOBBY_IN_PROGRESS' ? 'resume' : 'connect'}
              </Button>
              <Button
                size="lg"
                colorScheme="red"
                variant="link"
                p="2"
                onClick={() => removeGame(game.id)}
              >
                x
              </Button>
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default UserTable
