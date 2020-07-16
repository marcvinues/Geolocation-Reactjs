import * as types from '../actions/types'

const initialState = {
  job: [],
  error: null,
  loading: false
}

export default function(state = initialState, action){
  switch(action.type){
      case types.GET_JOB:
          return {
              ...state,
              error: null,
              loading: true
          }
      case types.GET_JOB_SUCCESS:
          return {
              ...state,
              error: false,
              loading: false,
              job: action.payload
          }
        case types.GET_JOB_ERROR:
            return {
                ...state,
                error: true,
                loading: false,
            }
      default:
          return state;
  }
}