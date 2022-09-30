import axios from "axios"
const token = localStorage.getItem('token')

const CANCEL_UPDATE = 'CANCEL_UPDATE'
const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
const PROFILE_ERROR = 'PROFILE_ERROR'

const initialState = {
  loading: false,
  error: null,
  profile: {},
  profileId: ''
}

export const getProfile = () => {
  return async function(dispatch){
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/user',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      dispatch({type: "PROFILE_SUCCESS", payload: data.profile })
    } catch (error) {
      dispatch({type: "PROFILE_ERROR", payload: error })
    }
  }
}

export function ProfileReducer(state = initialState, action){
  switch(action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        profileId: action.payload,
      }
    case CANCEL_UPDATE:
      return {
        ...state,
        profileId: '',
    }
    case PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}