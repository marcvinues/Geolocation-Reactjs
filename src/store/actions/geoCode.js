import '@babel/polyfill'
import * as types from './types';
import axios from 'axios'
import { Toaster } from '../../components/toaster'


//GEOCODE
const API_GEO = 'https://stuart-frontend-challenge.now.sh/geocode'
const API_JOB = 'https://stuart-frontend-challenge.now.sh/jobs'
export const getGeo = (data) => async dispatch => {

  const sendData = {
    address: data
  }
  await axios.post(API_GEO, sendData)
  .then((response)=> {
      dispatch(getGeoSuccess(response.data))
      //show toaster
    })
    .catch((error) => {
      dispatch(getGeoError(error))
    })
}

export const getGeoSuccess = (data) => {
  return {
    payload: data,
    type: types.GET_GEO_SUCCESS
  }
}

export const getGeoError = (error) => {
  return {
    payload: error,
    type: types.GET_GEO_ERROR
  }
}

// JOB 
export const getJob = (pickup, dropoff) => async dispatch => {
  const sendData = {
    "pickup": pickup,
    "dropoff": dropoff
  }
  await axios.post(API_JOB, sendData)
  .then((response)=> {
    //show toaster
      dispatch(getJobSuccess(response.data))
    })
    .catch((error) => {
      dispatch(getJobError(error))
    })
}

export const getJobSuccess = (data) => {
  return {
    payload: data,
    type: types.GET_JOB_SUCCESS
  }
}

export const getJobError = (error) => {
  return {
    payload: error,
    type: types.GET_JOB_ERROR
  }
}