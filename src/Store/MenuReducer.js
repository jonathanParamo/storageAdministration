const CHANGE_SECTION = 'CHANGE_SECTION'

const initialState = {
  section: 'view',
}

export function MenuReducer(state = initialState, action){
  switch(action.type) {
    case CHANGE_SECTION:
      return {
        ...state,
        section: action.payload,
      }
    default:
      return state
  }
}