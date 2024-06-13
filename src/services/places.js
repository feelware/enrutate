import axios from "axios"
import axiosRetry from "axios-retry"

axiosRetry(axios)

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const search = async (search, signal) => {
  console.log(API_KEY)
  const url = 'https://places.googleapis.com/v1/places:searchText'
  const res = await axios.post(url, { textQuery: search }, 
    { 
      signal, 
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
        "X-Goog-languageCode": "es-419",
        "Access-Control-Allow-Origin": "*"
      }
    }
  )
  return res.data
}

export default { search }