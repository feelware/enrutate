import {
  Stack,
  Text,
  Card,
  rem
} from '@mantine/core'

const OrdersList = ({ products }) => {
  return (
    <Stack 
      gap={10} 
      p={15}
    >
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
  )
}

export default OrdersList