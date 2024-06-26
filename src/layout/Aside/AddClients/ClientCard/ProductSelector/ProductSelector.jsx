import {
  Autocomplete,
  Card,
  Stack,
  ScrollArea,
  Text,
  NumberInput,
  Group,
  Button,
  Anchor,
  rem,
} from '@mantine/core'

import {
  useMap
} from '@mantine/hooks'

import {
  IconSearch
} from '@tabler/icons-react'

import { getProducts } from '../../../../../services/products'

const ProductSelector = ({
  client,
  onUpdate,
  onClose
}) => {
  const allProducts = getProducts()
  const clientCurrentProducts = client.products
  const newProducts = useMap(clientCurrentProducts.map(
    (product) => [product.id, product]
  ))
  const newProductsList = Array.from(newProducts.values())

  return (
    <Stack
      h='100%'
      gap={10}
    >
      <Autocomplete
        comboboxProps={{ 
          withinPortal: false,
          styles: {
            option: {
              fontSize: 13
            }
          }
        }}
        data={allProducts.map((product) => ({
          value: product.id,
          label: product.name,
        }))}
        onOptionSubmit={(id) => {
          newProducts.set(id, {
            ...allProducts.find((p) => p.id === id),
            amount_requested: 1
          })
        }}
        placeholder='Añadir productos'
        leftSection={<IconSearch size={13} />}
        maxDropdownHeight={150}
        styles={{
          input: {
            fontSize: rem(13),
            color: 'var(--mantine-color-dark-1)',
            backgroundColor: 'transparent',
            borderColor: 'var(--mantine-color-dark-6)',
          },
        }}
      />
      <ScrollArea 
        h='100%'
        bg={'var(--mantine-color-dark-8)'}
        px={7}
        style={{
          borderRadius: 'var(--mantine-radius-sm)',
        }}
      >
        <Stack
          my={7}
          gap={7}
        >
        {
          newProductsList.map((p) => (
            <Card 
              key={p.id}
              bg='var(--mantine-color-dark-7)'
            >
              <Group 
                gap={20}
                grow 
                preventGrowOverflow={false}
              >
                <Stack 
                  gap={2}
                  w='125'
                  flex={2}
                >
                  <Text 
                    size='xs'
                    truncate='end'
                    fw={500}
                  >
                    {p.name}
                  </Text>
                  <Anchor 
                    size={rem(11)} 
                    c='dimmed'
                    w={rem(17)}
                    onClick={() => {
                      newProducts.delete(p.id)
                    }}
                  >
                    Eliminar
                  </Anchor>
                </Stack>
                <NumberInput
                  size='xs'
                  flex={1}
                  value={p.amount_requested}
                  onChange={(value) => {
                    newProducts.set(p.id, {
                      ...p,
                      amount_requested: value
                    })
                  }}
                  styles={{
                    input: {
                      backgroundColor: 'transparent',
                      borderColor: 'var(--mantine-color-dark-6)',
                    },
                    control: {
                      borderColor: 'var(--mantine-color-dark-6)',
                    }
                  }}
                  allowNegative={false}
                  allowDecimal={false}
                  min={1}
                />
              </Group>
            </Card>
          ))
        }
        </Stack>
      </ScrollArea>
      <Group grow>
        <Button 
          variant='default'
          onClick={onClose}
          styles={{
            root: {
              border: '1px solid transparent',
            }
          }}
        >
          Cancelar
        </Button>
        <Button
          disabled={
            !newProductsList.every(p => p.amount_requested > 0)
          }
          onClick={() => {
            onUpdate({
              ...client,
              products: newProductsList
            })
            onClose()
          }}
        >
          Guardar
        </Button>
      </Group>
    </Stack>
  )
}

export default ProductSelector