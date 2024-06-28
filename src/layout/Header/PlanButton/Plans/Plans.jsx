import {
  ScrollArea,
  Grid,
} from '@mantine/core'

import { getPlans, deletePlan } from '../../../../services/plans'

import PlanCard from './PlanCard'
import { useState } from 'react'

const Plans = ({ onClose }) => {
  const allPlans = getPlans()
  const [plans, setPlans] = useState(allPlans)

  return (
    <ScrollArea
      w={700}
      h={400}
      bg='dark.7'
      scrollbars='y'
      px={15}
      py={10}
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
              onClose={onClose}
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
  )
}

export default Plans