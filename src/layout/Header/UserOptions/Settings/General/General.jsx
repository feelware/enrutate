import {
  TextInput,
  Group,
  Button,
  Stack
} from '@mantine/core'

import PlacesSearchBar from '../../../../../components/PlacesSearchBar'

const General = ({ form, onSubmit }) => {
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await onSubmit(values)
        form.resetDirty()
      })}
      style={{ height: '100%' }}
    >
      <Stack h='100%'>
        <Stack gap={15} h='100%'>
          <TextInput
            label="Nombre"
            placeholder="Mi empresa"
            withAsterisk
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Correo electrónico"
            placeholder="logistca@empresa.com"
            withAsterisk
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PlacesSearchBar 
            label="Ubicación de almacén"
            initialValue={form.values.depot_description}
            glowOnError
            onSubmit={(place) => {
              form.setValues({
                depot_description: place.description,
                depot_formatted_address: place.formatted_address,
                depot_lat: place.lat,
                depot_lng: place.lng
              })
            }}
            withAsterisk
          />
        </Stack>
        <Group justify="flex-end" mt="md">
          <Button 
            type="submit"
            disabled={!form.isDirty()}
          >
            Guardar
          </Button>
        </Group>
      </Stack>
    </form>
  )
}

export default General