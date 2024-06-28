import {
  Timeline
} from '@mantine/core'

import Waypoint from './Waypoint'

const CardBody = (route) => {
  return (
    <Timeline
      py={20}
      px={25}
      bulletSize={12} 
      lineWidth={2}
    >
    {
      route.clients.map(client => (
        <Waypoint 
          key={client.id} 
          name={client.main_text}
          address={client.formatted_address}
          products={client.products} 
        />
      ))
    }
    </Timeline>
  )
}

export default CardBody