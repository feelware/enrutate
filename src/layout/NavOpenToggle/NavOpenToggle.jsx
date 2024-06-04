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
    toggleDesktopNav,
    toggleMobileNav,
    navPadding
  } = useGUIStore()

  return (
    <Affix position={{ top: navPadding, left: navPadding }}>
      <ActionIcon hiddenFrom="sm" onClick={toggleMobileNav} variant="default">
        <IconMenu2 size={rem(15)}/>
      </ActionIcon>
      <ActionIcon visibleFrom="sm" onClick={toggleDesktopNav} variant="default">
        <IconMenu2 size={rem(15)}/>
      </ActionIcon>
    </Affix>
  )
}

export default NavOpenToggle;