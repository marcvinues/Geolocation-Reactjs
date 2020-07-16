import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux'
import PickupMarker from '../../assets/images/pickUpMarker.svg'
import DropoffMarker from '../../assets/images/dropOffMarker.svg'


const center = {
  lat: 48.8537046,
  lng: 2.3329639
}

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const GoogleMaps = () => {
  const [geo, setGeo] = useState('')

  const geolocate = useSelector(state => state.geo)
  const getJobs = useSelector(state => state.job)

  useEffect(()=> {
    if(geolocate.geo !== undefined){
      setGeo(geolocate)
    }

  }, [geolocate])


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.API_KEY
  })

  if(loadError) return "Error"
  if(!isLoaded) return "Loading maps"

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
      { geolocate.geo.length !== 0 ?
    
        <Marker 
          position={{
            lat: geolocate.geo.latitude,
            lng: geolocate.geo.longitude
          }}
          icon={{
            url: PickupMarker
          }}
        />
        : null
      }
      {
        getJobs.job.length !== 0 ?
    
        <Marker 
          position={{
            lat: getJobs.job.dropoff.latitude,
            lng: getJobs.job.dropoff.longitude
          }}
          icon={{
            url: DropoffMarker
          }}
        />
        : null
      }
      </GoogleMap>
    </div>
  )

}

export default React.memo(GoogleMaps)



