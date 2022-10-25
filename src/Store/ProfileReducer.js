import axios from "axios"
const token = localStorage.getItem('token')

const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
const PROFILE_ERROR = 'PROFILE_ERROR'

const initialState = {
  loading: false,
  error: null,
  profile: {},
}

export const getProfileData = () => {
  return async function(dispatch){
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/users/get',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      dispatch({type: PROFILE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({type: PROFILE_ERROR, payload: error })
    }
  }
}

export function ProfileReducer(state = initialState, action){
  switch(action.type) {
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