const STORAGE_ERROR = 'STORAGE_ERROR'
const STORAGE_SUCCESS = 'STORAGE_SUCCESS'
const STORAGE_LOADING = 'STORAGE_LOADING'
const STORAGE_SECTION = 'STORAGE_SECTION'

const initialState = {
  storages: {},
  loading: false,
  error: null,
  section: 'create',
}

export function StorageReducer(state = initialState, action){
  switch(action.type) {
    case STORAGE_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case STORAGE_SUCCESS:
      return {
        ...state,
        storages: action.payload,
      }
    case STORAGE_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case STORAGE_SECTION:
      return {
        ...state,
        section: action.payload,
      }
    default:
      return state
  }
}