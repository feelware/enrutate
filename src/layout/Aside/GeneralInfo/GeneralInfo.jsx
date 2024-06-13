import {
  Stack,
  Title,
  TextInput
} from '@mantine/core'

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
    <Stack pt={15}>
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