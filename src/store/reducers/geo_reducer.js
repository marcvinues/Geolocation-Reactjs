import * as types from '../actions/types'

const initialState = {
  geo: [],
  error: null,
  loading: false
}

export default function(state = initialState, action){
  switch(action.type){
      case types.GET_GEO:
          return {
              ...state,
              error: null,
              loading: true
          }
      case types.GET_GEO_SUCCESS:
          return {
              ...state,
              error: false,
              loading: false,
              geo: action.payload
          }
        case types.GET_GEO_ERROR:
            return {
                ...state,
                error: true,
                loading: false,
            }
      default:
          return state;
  }
}