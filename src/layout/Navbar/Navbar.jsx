import {
  Stack,
  ScrollArea,
} from '@mantine/core'

import RouteCard from './RouteCard' 

import useViewingPlan from '../../store/useViewingPlan'

const Navbar = () => {
  const { viewingPlan } = useViewingPlan()

  if (!viewingPlan) {
    return
  }

  return (
    <ScrollArea scrollbarSize={11} h='100%'>
      <Stack gap='md' m='sm'>
      {
        viewingPlan.routes?.map((route, index) => {
          return (
            <RouteCard 
              key={route.id}
              index={index}
              { ...route}
            />
          )
        })
      }
      </Stack>
    </ScrollArea>
  );
}

export default Navbar;