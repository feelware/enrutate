import {
  Card,
  Stack,
  Collapse
} from '@mantine/core'

import { useDisclosure } from '@mantine/hooks';

import CardHeader from './CardHeader'
import CardBody from './CardBody'

import classes from './RouteCard.module.css'

const RouteCard = ({ scrollIntoView, ...route }) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Card mx={12} p={0}>
        <Stack gap={0}>
          <CardHeader 
            {...route} 
            onClick={() => {
              scrollIntoView()
              toggle()
            }}
          />
          <Collapse in={opened}>
            <CardBody className={classes.body} {...route} />
          </Collapse>
        </Stack>
      </Card>
    </>
  )
}

export default RouteCard