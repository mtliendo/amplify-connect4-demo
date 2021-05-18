import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Center,
} from '@chakra-ui/react'
import { Connect4 } from './components/Connect4GameLocal'
import { useHistory } from 'react-router-dom'

const HomePage = () => {
  const history = useHistory()
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Let's Play{' '}
          <Text as={'span'} color={'orange.400'}>
            Connect4
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Play with friends next to you simply by clicking below. You can also
          sign up to play with other online players. It's never been easier to
          play this classic game!
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}
            type="submit"
            onClick={e => {
              e.preventDefault()
              history.push('/lobby')
            }}
          >
            Play in Lobby
          </Button>
          <Button rounded={'full'} px={6} colorScheme="teal">
            Learn more
          </Button>
        </Stack>
        <Center w={'full'}>
          <Connect4 />
        </Center>
      </Stack>
    </Container>
  )
}

export default HomePage
