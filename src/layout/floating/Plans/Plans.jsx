import {
  ScrollArea,
  Modal,
  Grid,
} from '@mantine/core'

import { getPlans, deletePlan } from '../../../services/plans'
import { useLocation, useRoute } from 'wouter'

import PlanCard from './PlanCard'
import { useState } from 'react'

const Plans = () => {
  const [opened] = useRoute('/plans')
  const allPlans = getPlans()
  const [plans, setPlans] = useState(allPlans)
  const [, setLocation] = useLocation()

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setLocation('/')
        }}
        withCloseButton={true}
        centered
        size='xl'
      >
        <ScrollArea
          h={400}
          bg='var(--mantine-color-dark-8)'
          scrollbars='y'
          px={8}
        >
          <Grid 
            gutter={8}
            py={8}
          >
          {
            plans.map(plan => (
              <Grid.Col 
                span={{
                  base: 12,
                  xs: 6,
                  sm: 4
                }}
                m={0}
                key={plan.id}
              >
                <PlanCard 
                  plan={plan} 
                  onDelete={async () => {
                    await deletePlan(plan.id)
                    setPlans(getPlans())
                  }}
                />
              </Grid.Col> 
            ))
          }
          </Grid>
        </ScrollArea>
      </Modal>
    </>
  )
}

export default Plans