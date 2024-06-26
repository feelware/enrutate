import {
  Timeline
} from '@mantine/core'

import Waypoint from './Waypoint'

import classes from './CardBody.module.css'

const CardBody = (route) => {
  return (
    <Timeline
      className={classes.content} 
      py={20}
      px={25}
      bulletSize={16} 
      lineWidth={2}
    >
    {
      route.clients.map(client => (
        <Waypoint key={client.id} client={client} />
      ))
    }
    </Timeline>
  )
}

export default CardBody