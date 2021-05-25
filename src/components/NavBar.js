import { AuthState } from '@aws-amplify/ui-components'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Box, Flex, HStack, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher'

const Links = [
  { displayName: 'Home', href: '/' },
  { displayName: 'Lobby', href: '/lobby' },
  { displayName: 'My Profile', href: '#' },
]

const NavLink = ({ children, href }) => {
  return <Link to={`${href}`}>{children}</Link>
}

export default function NavBar({ authState }) {
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'}>
          <Flex justifyContent={'flex-start'} flex="1">
            <HStack spacing={8}>
              <HStack as={'nav'} spacing={4}>
                {Links.map(link => (
                  <NavLink key={link.displayName} href={link.href}>
                    {link.displayName}
                  </NavLink>
                ))}
              </HStack>
            </HStack>
          </Flex>
          {authState.authStage === AuthState.SignedIn && authState.user && (
            <AmplifySignOut
              buttonText={`SIGN OUT OF ${authState.user.username}`}
            />
          )}
          <Flex justifyContent="flex-end">
            <ColorModeSwitcher />
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
