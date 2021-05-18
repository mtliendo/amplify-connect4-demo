import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'

function PlayerModal({ isModalOpen, closeModal, playerDetails, onConnect }) {
  const { isOpen, onClose } = useDisclosure({
    isOpen: isModalOpen,
    onClose: closeModal,
  })
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Player Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Avatar
            name={playerDetails.username}
            src={playerDetails.profilePic}
          />
          <Text>{playerDetails.username}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={onConnect}>
            Connect
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PlayerModal
