const CANCEL_UPDATE = 'CANCEL_UPDATE'
const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS'
const PRODUCT_SECTION = 'PRODUCT_SECTION'

const initialState = {
  loading: false,
  error: null,
  products: {},
  section: 'view',
}

export function ProductReducer(state = initialState, action){
  switch(action.type) {
    case PRODUCT_SECTION:
      return {
        ...state,
        section: 'view',
      }
      case CANCEL_UPDATE:
        return {
          ...state,
          section: action.payload,
      }
    case PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
      }
    default:
      return state
  }
}