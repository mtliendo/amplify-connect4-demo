import API from '@aws-amplify/api'
import React, { useEffect, useState } from 'react'
import { onGameUpdatedByID } from './graphql/subscriptions'
import { Connect4 } from './components/Connect4GameAmplify'
import { updateGame } from './graphql/mutations'
import { useLocation } from 'react-router-dom'
import { Center } from '@chakra-ui/layout'

function Connect4Page({ authUser }) {
  const location = useLocation()
  const [currentGame, setCurrentGame] = useState(location.state.currentGame)

  useEffect(() => {
    const subscribeToGameUpdates = () => {
      return API.graphql({
        query: onGameUpdatedByID,
        variables: { id: location.state.currentGame.id },
      }).subscribe({
        next: ({ value }) => {
          //update the board state
          setCurrentGame(value.data.onGameUpdatedByID)
        },
        error: e => console.log(e),
      })
    }
    const subscription = subscribeToGameUpdates()
    return () => subscription.unsubscribe()
  }, [location.state.currentGame.id])

  const handleBoardUpdate = updatedGameDetails => {
    API.graphql({
      query: updateGame,
      variables: {
        input: {
          id: location.state.currentGame.id,
          ...updatedGameDetails,
          board: JSON.stringify(updatedGameDetails.board),
        },
      },
    })
  }

  return (
    <Center h="90vh">
      <Connect4
        gameDetails={currentGame}
        authPlayer={authUser.username}
        onBoardUpdate={handleBoardUpdate}
      />
    </Center>
  )
}

export default Connect4Page
