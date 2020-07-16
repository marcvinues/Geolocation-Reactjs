import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGeo, getJob } from '../../store/actions'
import PickupLogo from '../../assets/images/pickUpBadgeBlank.svg'
import PickupLogoSuccess from '../../assets/images/pickUpBadgePresent.svg'
import PickupLogoError from '../../assets/images/pickUpBadgeError.svg'
import FlagLogo from '../../assets/images/dropOffBadgeBlank.svg'
import FlagLogoSuccess from '../../assets/images/dropOffBadgePresent.svg'
import FlagLogoError from '../../assets/images/dropOffBadgeError.svg'
import './style.scss'


export const Search = () => {

  const [ geolocate, setGeolocate ] = useState('')
  const [ job, setJob ] = useState('')
  const [ disabledBtn, setDisableBtn] = useState(true)

  const dispatch = useDispatch()

 
  const handleGeolocate = () => {

    dispatch(getGeo(geolocate))
  }

  const getGeolocate = useSelector(state => state.geo)
  
  
  const handleSubmit = event => {
    event.preventDefault();
    setDisableBtn(false)
    dispatch(getJob(geolocate, job))

  }
  const getJobs = useSelector(state => state.job)

  
  const handleLogoGeo = () => {
    // extrac to another function to handle

    const { error } = getGeolocate

    if(error === false){
      return  <img src={PickupLogoSuccess} alt="pick up" />
    } else {
      return  <img src={PickupLogoError} alt="pick up" />
    }
  }

  const handleLogoJob = () => {
    // extrac to another function to handle
    const { error } = getJobs

    if(error === false){
      return  <img src={FlagLogoSuccess} alt="pick up" />
    } else {
      return  <img src={FlagLogoError} alt="pick up" />
    }
  }

  let loading = getJobs.loading === true ? <p>Creating job...</p> : <p> Create Job</p>

  return (
    <div className="content-form">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="icon">
            {getGeolocate.error === null ? <img src={PickupLogo} alt="pick up" /> : handleLogoGeo()}
          </div>
          <div>
            <input 
              type="text"
              name="geolocate"
              value={geolocate}
              onChange={(e)=> setGeolocate(e.target.value)}
              placeholder="Pick up address"
              onBlur={handleGeolocate}
            />
          </div>
        </div>
        <div className="flex">
          <div className="icon">
          { getJobs.error === null ? <img src={FlagLogo} alt="pick up" /> : handleLogoJob()}
          
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Drop off address" 
              value={job}
              onChange={(e)=> {setJob(e.target.value), setDisableBtn(false)}}
            />
          </div>
        </div>
        <button disabled={disabledBtn}>{loading}</button>
      </form>
    </div>
  )
}
