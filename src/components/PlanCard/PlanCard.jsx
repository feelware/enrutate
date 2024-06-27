import { 
  Card,
  Flex,
  Image,
  Text,
  Group,
  Center,
  Button,
  ActionIcon 
} from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { IconCalendarTime, IconUsers, IconTruck, IconDots } from '@tabler/icons-react'
import { useLocation } from 'wouter'
import classes from './PlanCard.module.css'

const Feature = ({ label, icon: Icon }) => (
  <Center key={label}>
    <Icon size="1.05rem" className={classes.icon} stroke={1.5} />
    <Text size="xs">{label}</Text>
  </Center>
)

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
]

export function PlanCard({ plan }) {
  const [, setLocation] = useLocation()

  const features = [
    { label: `${plan.start} - ${plan.end}`, icon: IconCalendarTime },
    { label: `${plan.total_clients} clientes`, icon: IconUsers },
    { label: `${plan.vehicles_used} vehículos usados`, icon: IconTruck }
  ]

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={220} />
    </Carousel.Slide>
  ))

  return (
    <Card withBorder radius="md" className={classes.card} style={{ width: 300 }}>
      <Card.Section>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
          initialSlide={Math.floor(Math.random() * images.length)}
        >
          {slides}
        </Carousel>
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div style={{ 
          maxWidth: 200,
          overflow: 'hidden',
          textOverflow: 'ellipsis', 
        }}>
          <Text fw={500} truncate="end">
            {plan.name}
          </Text>
          <Text fz="xs" c="dimmed" truncate="end">
            {plan.desc}
          </Text>
        </div>
        <ActionIcon color="gray" variant="transparent">
          <IconDots size={20} />
        </ActionIcon>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Flex gap={8} mb={-8} direction='column' align='flex-start'>
        {
          features.map((feature) => (
            <Feature key={feature.label} {...feature} />
          ))
        }
        </Flex>
      </Card.Section>

      <Card.Section className={classes.section} >
        <Button color="dark" onClick={() => setLocation(`/plan/${plan.id}`)}>
          Abrir
        </Button>
      </Card.Section>
    </Card>
  )
}