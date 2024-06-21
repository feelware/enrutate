import {
  Stack,
  Title,
  TextInput
} from '@mantine/core'

import { DateTimePicker } from '@mantine/dates'
import useNewPlan from '../../../store/useNewPlan'

const GeneralInfo = () => {
  const newPlan = useNewPlan()

  return (
    <Stack >
      <Title order={3}>
        Informacion general
      </Title>
      <Stack>
        <TextInput
          label='Titulo'
          placeholder='Nuevo plan'
          value={newPlan.title}
          onChange={(event) => newPlan.setTitle(event.currentTarget.value)}
        />
        <TextInput
          label='Descripcion'
          placeholder='Nuevo plan de entrega de productos'
          value={newPlan.description}
          onChange={(event) => newPlan.setDescription(event.currentTarget.value)}
        />
        <DateTimePicker
          label='Fecha y hora de inicio'
          value={newPlan.startDate}
          onChange={(value) => newPlan.setStartDate(value)}
        />
      </Stack>
    </Stack>
  )
}

export default GeneralInfo