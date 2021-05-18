import API from '@aws-amplify/api'
import { withAuthenticator } from '@aws-amplify/ui-react'
import React, { useEffect, useRef, useState } from 'react'
import { onGameUpdatedByID } from '../../src/graphql/subscriptions'
import { Connect4 } from '../../components/Connect4GameAmplify'
import { gameById } from '../../src/graphql/queries'
import { updateGame } from '../../src/graphql/mutations'
import Auth from '@aws-amplify/auth'
import { debounce } from 'debounce'

function Connect4Page() {
  const gameIdRef = useRef(window.location.pathname.split('/')[2])
  const [currentGame, setCurrentGame] = useState({})
  const [currentUser, setCurrentUser] = useState('')

  const fetchGame = async () => {
    const { data } = await API.graphql({
      query: gameById,
      variables: { id: gameIdRef.current },
    })

    return data.gameById.items[0]
  }

  const fetchUser = async () => {
    const { username } = await Auth.currentAuthenticatedUser()
    return username
  }

  const subscribeToGameUpdates = () => {
    return API.graphql({
      query: onGameUpdatedByID,
      variables: { id: gameIdRef.current },
    }).subscribe({
      next: ({ value }) => {
        //update the board state
        setCurrentGame(value.data.onGameUpdatedByID)
      },
      error: (e) => console.log(e),
    })
  }

  useEffect(() => {
    Promise.all([fetchGame(), fetchUser()]).then(([gameInfo, username]) => {
      setCurrentGame(gameInfo)
      setCurrentUser(username)
    })
  }, [])

  useEffect(() => {
    const subscription = subscribeToGameUpdates()
    return () => subscription.unsubscribe()
  }, [])

  const handleBoardUpdate = (updatedGameDetails) => {
    API.graphql({
      query: updateGame,
      variables: {
        input: {
          id: currentGame.id,
          ...updatedGameDetails,
          board: JSON.stringify(updatedGameDetails.board),
        },
      },
    })
  }

  return (
    <div>
      {!currentGame.id ? (
        'loading'
      ) : (
        <Connect4
          gameDetails={currentGame}
          authPlayer={currentUser}
          onBoardUpdate={handleBoardUpdate}
        />
      )}
    </div>
  )
}

export default withAuthenticator(Connect4Page)
