import {
  Modal,
  // NavLink
} from '@mantine/core'

const Settings = ({ opened, onClose }) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        withCloseButton={false}
      >
        holaaa
      </Modal>
    </>
  )
}

export default Settings