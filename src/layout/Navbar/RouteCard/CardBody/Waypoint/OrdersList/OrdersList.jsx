import {
  ScrollArea,
  Stack,
  Text,
  Card,
  ActionIcon,
  Group,
  rem
} from '@mantine/core'

import {
  IconX
} from '@tabler/icons-react'

const OrdersList = ({ products, onClose }) => {
  return (
    <Group align='flex-start'>
      <ScrollArea mah={200} flex={1}>
        <Stack gap={10} >
        {
          products
          .map(product => (
            <Card key={product.id} p={5}>
              <Stack gap={rem(5)} >
                <Text size={rem(13)} fw={500}>
                  {product.name}
                </Text>
                <Text size={rem(13)} c="dimmed">
                  {product.amount_requested}
                </Text>
              </Stack>
            </Card>
          ))
        }
        </Stack>
      </ScrollArea>
      <ActionIcon 
        title="Cerrar"
        variant="transparent"
        color="default"
        onClick={onClose}
      >
        <IconX size={rem(15)} />
      </ActionIcon>
    </Group>
  )
}

export default OrdersList