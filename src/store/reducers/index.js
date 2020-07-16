import { combineReducers } from 'redux'
import JobReducer from './job_reducer'
import GeoReducer from './geo_reducer'

export default combineReducers({
    job: JobReducer,
    geo: GeoReducer
})