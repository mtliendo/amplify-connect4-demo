import React, { useEffect, useState } from 'react'
import { Input, Button, VStack, Container, Stack } from '@chakra-ui/react'
import UserTable from '../components/UserTable'
import { withAuthenticator } from '@aws-amplify/ui-react'
import API from '@aws-amplify/api'
import {
  gamesBySentToPlayer,
  playersByUsername,
  gamesCreatedBySelf,
} from '../src/graphql/queries'
import PlayerModal from '../components/PlayerModal'
import Auth from '@aws-amplify/auth'
import { onGameCreatedForSelf } from '../src/graphql/subscriptions'
import { createGame } from '../src/graphql/mutations'
import { generateNewBoard } from '../gameUtils'

function Lobby() {
  const [usernameInputText, setUsernameInputText] = useState('')
  const [foundUser, setFoundUser] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gameList, setGameList] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  const fetchGames = async ({ username, query, varAttr, queryName }) => {
    const { data } = await API.graphql({
      query: query,
      variables: {
        [varAttr]: username,
        gameStatus: { beginsWith: 'LOBBY_' },
      },
    })

    return data[queryName].items
  }

  useEffect(() => {
    let subscription

    Auth.currentAuthenticatedUser().then(async (currentUser) => {
      const [gamesToMeFromOthers, gamesToOthersFromMe] = await Promise.all([
        fetchGames({
          username: currentUser.username,
          query: gamesBySentToPlayer,
          queryName: 'gamesBySentToPlayer',
          varAttr: 'sentToPlayer',
        }),
        fetchGames({
          username: currentUser.username,
          query: gamesCreatedBySelf,
          queryName: 'gamesCreatedBySelf',
          varAttr: 'createdByPlayer',
        }),
      ])

      //listen for new games
      subscription = API.graphql({
        query: onGameCreatedForSelf,
        variables: {
          sentToPlayer: currentUser.username,
        },
      }).subscribe({
        next: ({ value }) => {
          setGameList((prevGameList) => {
            return [value.data.onGameCreatedForSelf, ...prevGameList]
          })
        },
        error: (e) => console.warn('the error in subscribing', e),
      })

      setGameList([...gamesToMeFromOthers, ...gamesToOthersFromMe])
      setCurrentUser(currentUser)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (usernameInputText !== currentUser.username) {
      const { data } = await API.graphql({
        query: playersByUsername,
        variables: { username: usernameInputText },
      })

      const foundPlayer = data.playersByUsername.items[0]
      setFoundUser(foundPlayer)
      setIsModalOpen(true)
    }
  }

  const handleConnect = async () => {
    const { data } = await API.graphql({
      query: createGame,
      variables: {
        input: {
          createdByPlayer: currentUser.username,
          sentToPlayer: usernameInputText,
          gameName: 'CONNECT_4',
          player1: currentUser.username,
          player2: usernameInputText,
          currentPlayer: currentUser.username,
          board: JSON.stringify(generateNewBoard()),
          gameStatus: 'LOBBY_PENDING',
        },
      },
    })

    setGameList((prevState) => {
      return [data.createGame, ...prevState]
    })
  }

  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <form onSubmit={handleSubmit}>
          <VStack>
            <Input
              placeholder="Search by username"
              variant="outline"
              value={usernameInputText}
              onChange={(e) => setUsernameInputText(e.target.value)}
            />
            <Button type="submit" colorScheme="blue">
              Find User
            </Button>
            <PlayerModal
              isModalOpen={isModalOpen}
              closeModal={() => setIsModalOpen(false)}
              playerDetails={foundUser}
              onConnect={handleConnect}
            />
          </VStack>
        </form>
        <UserTable gameList={gameList} opponent={foundUser} me={currentUser} />
      </Stack>
    </Container>
  )
}

export default withAuthenticator(Lobby)
