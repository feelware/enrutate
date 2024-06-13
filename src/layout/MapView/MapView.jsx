import { 
  APIProvider, 
  Map,
  Marker
} from '@vis.gl/react-google-maps'

import useProcessStore from '../../store/useProcessStore'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const MapView = () => {
  const { 
    isViewing,
    currentPlan,
    newPlan 
  } = useProcessStore()
  const markers = []


  if (isViewing) {
    currentPlan?.routes.forEach(r =>
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
    newPlan?.waypoints.forEach(w => 
      markers.push(
        <Marker 
          key={w.client.id}
          position={{
            lat: w.client.lat,
            lng: w.client.lng
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