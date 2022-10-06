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