import {APIProvider, Map} from '@vis.gl/react-google-maps'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const MapView = () => (
  <APIProvider apiKey={API_KEY}>
    <Map
      style={{ width: '100%', height: '100%' }}
      defaultCenter={{lat: -12.022547226140922, lng: -76.98634892523226}}
      defaultZoom={11}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      onClick={(e) => console.log(e)}
    />
  </APIProvider>
)

export default MapView