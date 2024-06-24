import { 
  APIProvider, 
  Map,
  Marker
} from '@vis.gl/react-google-maps'

import useProcess from '../../store/useProcess'
import useViewingPlan from '../../store/useViewingPlan'
import useNewPlan from '../../store/useNewPlan'
import useGUI from '../../store/useGUI'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const MapView = () => {
  const { setMapLoading } = useGUI()
  const { isViewing } = useProcess()
  const { viewingPlan } = useViewingPlan()
  const newPlan = useNewPlan()

  const markers = []

  if (isViewing) {
    viewingPlan?.routes.forEach(r =>
      r.waypoints
      .filter(w => w.client)
      .forEach(w => (
        markers.push(
          <Marker
            key={w.id}
            position={{
              lat: w.client.lat,
              lng: w.client.lng
            }} 
          />
        )
      ))
    )
  }
  else {
    newPlan?.clients.forEach(client => 
      markers.push(
        <Marker
          key={client.id}
          position={{
            lat: client.lat,
            lng: client.lng
          }}
        />
      )
    )
  }

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
        {markers}
      </Map>
    </APIProvider>
  )
}

export default MapView