import { 
  Affix,
  ActionIcon,
  rem
} from '@mantine/core'
import {
  IconMenu2
} from '@tabler/icons-react'

import useGUI from '../../store/useGUI'

const NavOpenToggle = () => { 
  const {
    mobileNavOpened,
    setMobileNavOpened,
    desktopNavOpened,
    setDesktopNavOpened,
  } = useGUI()

  return (
    <Affix position={{ top: 25, left: 25 }}>
      <ActionIcon
        hiddenFrom="sm"
        onClick={() => setMobileNavOpened(!mobileNavOpened)}
        variant="default"
      >
        <IconMenu2 size={rem(15)}/>
      </ActionIcon>
      <ActionIcon 
        visibleFrom="sm"
        onClick={() => setDesktopNavOpened(!desktopNavOpened)} 
        variant="default"
      >
        <IconMenu2 size={rem(15)}/>
      </ActionIcon>
    </Affix>
  )
}

export default NavOpenToggle;