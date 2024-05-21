import { useState, useEffect } from "react"
import { Flex, TextInput } from '@mantine/core';
import { useLocation } from "wouter"
import { PlanCard } from "../../components/PlanCard/PlanCard"
import mockuser from '../../assets/mockuser'
import classes from './Planes.module.css'

const Planes = () => {
  const [, setLocation] = useLocation()
  const [filter, setFilter] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setLocation('/planes'), [])

  return (
    <div className={classes.main}>
      <TextInput
        value={filter}
        style={{ width: 300 }}
        onChange={(event) => setFilter(event.currentTarget.value)}
        placeholder="Buscar plan"
        className={classes.input}
      />
      <Flex wrap="wrap" gap="md">
        {
          mockuser.plans
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