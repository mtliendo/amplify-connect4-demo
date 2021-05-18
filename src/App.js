import React from 'react'
import { ChakraProvider, Container, Flex } from '@chakra-ui/react'
import { useEffect, useReducer } from 'react'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './HomePage'
import LobbyPage from './LobbyPage'
import ProtectedRoute from './components/ProtectedRoute'
import Connect4Page from './Connect4Page'
import Amplify from 'aws-amplify'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import config from './aws-exports'

Amplify.configure(config)

const authReducer = (state, action) => {
  switch (action.type) {
    case 'authStateChange':
      return { authStage: action.authStage, user: action.user }
    default:
      throw Error(`action ${action.type} not found.`)
  }
}

function App() {
  const [authState, dispatch] = useReducer(authReducer, {})

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, data) => {
      dispatch({
        type: 'authStateChange',
        authStage: nextAuthState, //signin, signup, signout etc
        user: data,
      })
    })
  }, [])

  return (
    <ChakraProvider>
      <Router>
        <NavBar authState={authState} />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/lobby">
            <ProtectedRoute component={LobbyPage} authState={authState} />
          </Route>
          <Route path="/game/connect4/:gameId">
            <ProtectedRoute component={Connect4Page} authState={authState} />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  )
}

export default App
