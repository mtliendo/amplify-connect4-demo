import React, { useEffect, useState } from 'react'
import { Input, Button, VStack, Container, Stack } from '@chakra-ui/react'
import UserTable from './components/UserTable'

import API from '@aws-amplify/api'
import {
  gamesBySentToPlayer,
  playersByUsername,
  gamesCreatedBySelf,
} from './graphql/queries'
import PlayerModal from './components/PlayerModal'
import { onGameCreatedForSelf } from './graphql/subscriptions'
import { createGame } from './graphql/mutations'
import { generateNewBoard } from './gameUtils'

function LobbyPage({ authUser }) {
  const [usernameInputText, setUsernameInputText] = useState('')
  const [foundUser, setFoundUser] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gameList, setGameList] = useState([])

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
    const fetchAllActiveGames = async () => {
      return await Promise.all([
        fetchGames({
          username: authUser.username,
          query: gamesBySentToPlayer,
          queryName: 'gamesBySentToPlayer',
          varAttr: 'sentToPlayer',
        }),
        fetchGames({
          username: authUser.username,
          query: gamesCreatedBySelf,
          queryName: 'gamesCreatedBySelf',
          varAttr: 'createdByPlayer',
        }),
      ])
    }

    fetchAllActiveGames().then(([gamesToMeFromOthers, gamesToOthersFromMe]) => {
      setGameList([...gamesToMeFromOthers, ...gamesToOthersFromMe])
    })
  }, [authUser.username])

  useEffect(() => {
    //listen for new games
    const subscription = API.graphql({
      query: onGameCreatedForSelf,
      variables: {
        sentToPlayer: authUser.username,
      },
    }).subscribe({
      next: ({ value }) => {
        setGameList(prevGameList => {
          return [value.data.onGameCreatedForSelf, ...prevGameList]
        })
      },
      error: e => console.warn('the error in subscribing', e),
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [authUser.username])

  const handleSubmit = async e => {
    e.preventDefault()
    if (usernameInputText !== authUser.username) {
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
          createdByPlayer: authUser.username,
          sentToPlayer: usernameInputText,
          gameName: 'CONNECT_4',
          player1: authUser.username,
          player2: usernameInputText,
          currentPlayer: authUser.username,
          board: JSON.stringify(generateNewBoard()),
          gameStatus: 'LOBBY_PENDING',
        },
      },
    })

    setGameList(prevState => {
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
              onChange={e => setUsernameInputText(e.target.value)}
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
        <UserTable gameList={gameList} />
      </Stack>
    </Container>
  )
}

export default LobbyPage
