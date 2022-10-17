const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
const PROFILE_ERROR = 'PROFILE_ERROR'

const initialState = {
  loading: false,
  error: null,
  profile: {},
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