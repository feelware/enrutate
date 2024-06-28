import {
  Group,
  Box,
} from '@mantine/core'

import PlanButton from './PlanButton'
import UserOptions from './UserOptions'
import NewButton from './NewButton'

const Header = () => {

  return (
    <>
      <Group
        h='100%'
        w='100%'
        justify='space-between'
        py={7}
        px={13}
      >
        <Box w={150}>
          <UserOptions />
        </Box>
        
        <PlanButton />

        <Box w={150}>
          <NewButton />
        </Box>
      </Group>
    </>
  )
}

export default Header