import {
  Autocomplete,
  Text,
  Stack,
  Loader
} from '@mantine/core'

import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService"

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const SearchBar = ({ onSubmit, setSubmitState }) => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: API_KEY,
    language: 'es-419',
    options: { types: ['establishment'] }
  })

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
      (result, status) => {
        console.log(status)
        if (!result) {
          setSubmitState({ 
            status: 'fail',
            failHandler: () => onOptionSubmit(description)
          })
          return
        }
        const newClient = {
          ...place,
          address: result.formatted_address,
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
        }
        onSubmit(newClient)
        setSubmitState({ status: 'idle' })
      }
    )
  }

  return (
    <Autocomplete
      label='Dirección o nombre comercial'
      placeholder='Av. Amezaga, Lima 15081'
      w={300}
      onChange={(input) => getPlacePredictions({ input })}
      data={Object.keys(predictionsMap)}
      filter={({ options }) => options}
      renderOption={renderOption}
      rightSection={isPlacePredictionsLoading && <Loader size={15}/>}
      onOptionSubmit={onOptionSubmit}
    />
  )
}

export default SearchBar