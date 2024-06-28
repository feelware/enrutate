import { 
  APIProvider, 
  Map,
  Marker,
} from '@vis.gl/react-google-maps'

import useGUI from '../../store/useGUI'
import useMarkers from './useMarkers'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const MapView = () => {
  const { setMapLoading } = useGUI()
  const markers = useMarkers()

  return (
    <APIProvider 
      apiKey={API_KEY}
      region='PE'
      language='es-419'
      libraries={['places']}
      onLoad={() => setMapLoading(false)}
    >
      <Map
        mapId='aeae66e71dbc67c9'
        style={{ width: '100%', height: '100%' }}
        defaultCenter={{lat: -12.022547226140922, lng: -76.98634892523226}}
        defaultZoom={11}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        onClick={(e) => console.log(e.detail.latLng)}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            {...marker}
          />
        ))}
      </Map>
    </APIProvider>
  )
}

export default MapView