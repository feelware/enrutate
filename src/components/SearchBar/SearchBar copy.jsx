import { 
  useState,
  useRef,
  useEffect,
  useMemo
} from "react"

import { useDebouncedValue } from '@mantine/hooks'

import {
  Combobox,
  Loader,
  TextInput,
  useCombobox 
} from "@mantine/core"

import {
  // useMap,
} from '@vis.gl/react-google-maps'

// import useUserStore from "../../store/useUserStore"
const google = window.google

const SearchBar = () => {
  // const map = useMap()
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  // const [empty, setEmpty] = useState(false)

  // const sessionToken = useMemo(
  //   () => new placesLib.AutocompleteSessionToken(),
  //   [placesLib],
  // )

  const service = google.maps.map
  
  const abortController = useRef()

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  // const { depot } = useUserStore()

  const fetchOptions = async (query) => {
    try {
      abortController.current?.abort()
      abortController.current = new AbortController()
      if (query == '') {
        setResults([])
        setLoading(false)
      }
      else {
        setLoading(true)
        const request = {
          input: query,
          // origin: { lat: depot.lat, lng: depot.lng },
          language: 'es-419',
          region: 'PE',
          // sessionToken: sessionToken,
        }
        const { suggestions } = await service.
        
        console.log(suggestions)
        setLoading(false)
        // setEmpty(result.length === 0)
      }
    } 
    catch (error) {
      if (error.name != 'CanceledError') {
        console.error(error)
      }
      return
    }
    abortController.current = undefined
  }

  const [debounced] = useDebouncedValue(value, 500)
  useEffect(() => {
    fetchOptions(debounced)
  }, [debounced])

  const options = ([])
    .map((item) => (
      <Combobox.Option 
        key={item.id}
        value={{
          id: item.id,
          name: item.displayName.text
        }}
      >
        <div style={{ margin: 5 }}>
          <h4 style={{ margin: 0 }}>
            {item.displayName.text}
          </h4>
          <p style={{ margin: 0 }}>
            {item.formattedAddress}
          </p>
        </div>
      </Combobox.Option>
    ))

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue.name)
        // setMainArticle(optionValue)
        combobox.closeDropdown()
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="Dirección o nombre comercial"
          placeholder="Av. Amezaga, Lima 15081"
          w={300}
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value)
            if (event.currentTarget.value != '') {
              combobox.resetSelectedOption()
              combobox.openDropdown()
            }
            else {
              combobox.closeDropdown()
            }
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
          rightSection={loading && <Loader size={18} /> }
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={!results}>
        <Combobox.Options mah={450} style={{ overflowY: 'auto' }}>
          {options}
          {/* {empty && <Combobox.Empty>No results</Combobox.Empty>} */}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

export default SearchBar