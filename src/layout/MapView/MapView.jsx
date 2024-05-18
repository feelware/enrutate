import {APIProvider, Map} from '@vis.gl/react-google-maps'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const MapView = () => (
  <APIProvider apiKey={API_KEY}>
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: -9.485422247461349, lng: -75.3989033654179}}
      defaultZoom={6}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  </APIProvider>
)

export default MapView