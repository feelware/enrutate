import {
  Card,
  Text,
  Title,
  Button,
  Stack,
  Group,
  Menu,
  UnstyledButton,
} from '@mantine/core'

import {
  IconDots,
  IconCalendar,
  IconUsersGroup,
  IconRoute,
  IconTrash,
} from '@tabler/icons-react'

import { useLocation } from 'wouter'

import toEsDate from '../../../../utils/toEsDate'

const PlanCard = ({ 
  plan,
}) => {
  const [, setLocation] = useLocation()

  const stats = [
    {
      label: `Inicia el ${toEsDate(plan.start)}`,
      Icon: IconCalendar
    },
    {
      label: `${plan.total_clients} clientes`,
      Icon: IconUsersGroup
    },
    {
      label: `${plan.routes.length} rutas`,
      Icon: IconRoute
    },
  ]

  return (
    <Card p={18}>
      <Stack gap={15}>
        <Stack gap={6}>
          <Title order={5} lh='h1' lineClamp={2}>
            {plan.title}
          </Title>
          <Text fz="xs" lh='xs' c="dimmed" lineClamp={2}>
            {plan.description}
          </Text>
        </Stack>

        <Stack
          gap={4}
        >
        {
          stats.map((stat, i) => (
            <Group key={i} gap={7}>
              <stat.Icon size={12}/>
              <Text size='xs' truncate='end'>
                {stat.label}
              </Text>
            </Group>
          ))
        }
        </Stack>
        <Group
          justify='space-between'
        >
          <Button
            variant='default'
            onClick={() => setLocation(`/plan/${plan.id}`)}
          >
            Abrir
          </Button>
          <Menu
            position='right-start'
          >
            <Menu.Target>
              <UnstyledButton p={5}>
                <IconDots 
                  size={15} 
                />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconTrash size={15} />}
                pr={15}
              >
                Eliminar
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Stack>


    </Card>
  )
}

export default PlanCard