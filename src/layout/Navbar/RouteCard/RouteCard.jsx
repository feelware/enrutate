import {
  Card,
  Collapse,
} from '@mantine/core'

import { useDisclosure } from '@mantine/hooks';

import CardHeader from './CardHeader'
import CardBody from './CardBody'

const RouteCard = ({ ...route }) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Card p={0}>
      <CardHeader
        {...route} 
        bodyToggle={toggle}
      />
      <Collapse in={opened}>
        <CardBody {...route} />
      </Collapse>
    </Card>
  )
}

export default RouteCard