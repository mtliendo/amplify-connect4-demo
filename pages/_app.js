import { ChakraProvider } from '@chakra-ui/react'
import Amplify, { Auth } from 'aws-amplify'
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import config from '../src/aws-exports'

Amplify.configure(config)

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetchUser().then((userData) =>
      setUser({ username: userData.username, ...userData.attributes })
    )
  }, [user.username])

  const fetchUser = async () => {
    const userData = await Auth.currentAuthenticatedUser().catch(() => ({}))

    return userData
  }

  const handleUpdateUser = () => {
    fetchUser().then((userData) =>
      setUser({ username: userData.username, ...userData.attributes })
    )
  }
  return (
    <ChakraProvider>
      <NavBar username={user.username} updateUser={() => handleUpdateUser()} />
      <Component {...pageProps} user={user} />
    </ChakraProvider>
  )
}

export default MyApp
