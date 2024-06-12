import { 
  Affix,
  ActionIcon,
  rem
} from '@mantine/core'
import {
  IconMenu2
} from '@tabler/icons-react'

import useGUIStore from '../../store/useGUIStore'

const NavOpenToggle = () => { 
  const {
    mobileNavOpened,
    setMobileNavOpened,
    desktopNavOpened,
    setDesktopNavOpened,
    navPadding
  } = useGUIStore()

  return (
    <Affix position={{ top: navPadding, left: navPadding }}>
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