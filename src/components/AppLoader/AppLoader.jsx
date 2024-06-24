import {
  Group,
  Card,
  Text,
  Loader,
} from '@mantine/core'

const AppLoader = () => {
  return (
    <Card p={25}>
      <Group>
        <Loader />
        <Text>
          Cargando...
        </Text>
      </Group>
    </Card>
  )
}

export default AppLoader