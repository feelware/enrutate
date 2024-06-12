import {
  Stack,
  Title,
  TextInput
} from '@mantine/core'

import { useState } from 'react'
import { DateTimePicker } from '@mantine/dates'

const GeneralInfo = ({
  title,
  setTitle,
  description,
  setDescription,
  date,
  setDate
}) => {
  return (
    <Stack py={20}>
      <Title order={3}>
        Informacion general
      </Title>
      <Stack>
        <TextInput
          label='Titulo'
          placeholder='Nuevo plan'
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <TextInput
          label='Descripcion'
          placeholder='Nuevo plan de entrega de productos'
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
        <DateTimePicker
          label='Fecha y hora de inicio'
          value={date}
          onChange={setDate}
        />
      </Stack>
    </Stack>
  )
}

export default GeneralInfo