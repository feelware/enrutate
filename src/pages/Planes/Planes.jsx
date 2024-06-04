import { useState, useEffect } from "react"
import { 
  Flex,
  TextInput,
  Group,
  Button
} from '@mantine/core';
import { useLocation } from "wouter"
import { PlanCard } from "../../components/PlanCard/PlanCard"
import users from '../../services/users'
import classes from './Planes.module.css'

const Planes = () => {
  const [plans, setPlans] = useState([])
  const [, setLocation] = useLocation()
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await users.getPlans()
      setPlans(plans)
    }
    fetchPlans()
    setLocation('/planes')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.main}>
      <Group>
        <TextInput
          value={filter}
          style={{ width: 300 }}
          onChange={(event) => setFilter(event.currentTarget.value)}
          placeholder="Buscar plan"
          className={classes.input}
        />
        <Button>
          Nuevo
        </Button>
      </Group>
      <Flex wrap="wrap" gap="md">
        {
          plans
          .filter((plan) => plan.name.toLowerCase().includes(filter.toLowerCase()))
          .map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
            />
          ))
        }
      </Flex>
    </div>
  )
}

export default Planes