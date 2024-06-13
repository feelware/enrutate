import {
  TextInput,
  Group,
  Button
} from '@mantine/core'

import { usePlacesWidget } from "react-google-autocomplete"
import useProcessStore from '../../store/useProcessStore'
import { useState } from 'react'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const SearchBar = () => {
  const {
    newPlan,
    setNewPlan
  } = useProcessStore()

  const [selected, setSelected] = useState(null)

  const { ref } = usePlacesWidget({
    apiKey: API_KEY,
    onPlaceSelected: setSelected,
    language: 'es-419',
    options: {
      types: ['establishment'],
      fields: ['place_id', 'formatted_address', 'geometry.location', 'name']
    }
  })
  return (
    <Group align='flex-end'>
      <TextInput
        label='Dirección o nombre comercial'
        placeholder='Av. Amezaga, Lima 15081'
        w={300}
        ref={ref}
      />
      <Button
        variant='default'
        disabled={!selected}
        onClick={() => {
          setNewPlan({
            ...newPlan,
            waypoints: [
              ...newPlan.waypoints,
              {
                client: {
                  id: selected.place_id,
                  name: selected.name,
                  address: selected.formatted_address,
                  lat: selected.geometry.location.lat(),
                  lng: selected.geometry.location.lng()
                }
              }
            ]
          })
        }}
      >
        Añadir
      </Button>
    </Group>
  )
}

export default SearchBar