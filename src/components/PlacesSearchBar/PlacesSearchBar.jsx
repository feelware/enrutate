import {
  Autocomplete,
  Text,
  Stack,
  Loader,
  Anchor,
} from '@mantine/core'
import { useState } from 'react'

import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService"

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const PlacesSearchBar = ({ 
  w,
  label,
  onSubmit,
  initialValue,
  setSubmitState = () => {},
  glowOnError,
  withAsterisk
}) => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading
  } = usePlacesService({
    apiKey: API_KEY,
    language: 'es-419',
    options: { types: ['establishment'] }
  })

  const [value, setValue] = useState(initialValue || '')
  const [error, setError] = useState(false)

  const predictionsMap = {}
  placePredictions.forEach(p => {
    predictionsMap[p.description] = {
      id: p.place_id,
      description: p.description,
      main_text: p.structured_formatting.main_text,
      secondary_text: p.structured_formatting.secondary_text,
    }
  })

  const renderOption = ({ option }) => {
    const prediction = predictionsMap[option.value]
    return (
      <Stack w={260} gap={0} py={5}>
        <Text size='sm' truncate='end'>
          {prediction.main_text}
        </Text>
        <Text size='xs' c='dimmed'>
          {prediction.secondary_text}
        </Text>
      </Stack>
    )
  }

  const onOptionSubmit = (description) => {
    setSubmitState({ status: 'loading' })
    const place = predictionsMap[description]
    placesService?.getDetails(
      {
        placeId: place.id,
        fields: [
          'geometry.location',
          'formatted_address',
        ]
      },
      (result) => {
        if (!result) {
          setError(true)
          setSubmitState({ 
            status: 'fail',
            failHandler: () => onOptionSubmit(description)
          })
          return
        }
        const newClient = {
          ...place,
          formatted_address: result.formatted_address,
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
        }
        onSubmit(newClient)
        setSubmitState({ status: 'idle' })
      }
    )
  }

  const fetchPredictions = (input) => {
    setValue(input)
    getPlacePredictions({ input })
  }

  let rightSection = null
  if (isPlacePredictionsLoading) {
    rightSection = <Loader size={15}/>
  }

  return (
    <Autocomplete
      w={w || '100%'}
      label={label || 'Dirección o nombre comercial'}
      placeholder='Av. Amezaga, Lima 15081'
      value={value}
      onChange={fetchPredictions}
      data={Object.keys(predictionsMap)}
      filter={({ options }) => options}
      renderOption={renderOption}
      rightSection={rightSection}
      onOptionSubmit={onOptionSubmit}
      error={glowOnError && error && (
        <Text size='xs' c='dimmed'>
          Hubo un error · {' '}
          <Anchor
            onClick={() => {
              onOptionSubmit(value)
              setError(false)
            }}
          >
            Reintentar
          </Anchor>
        </Text>
      )}
      withAsterisk={withAsterisk}
    />
  )
}

export default PlacesSearchBar