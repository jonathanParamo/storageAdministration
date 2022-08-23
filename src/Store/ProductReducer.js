const CANCEL_UPDATE = 'CANCEL_UPDATE'
const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS'
const PRODUCT_SECTION = 'PRODUCT_SECTION'

const initialState = {
  loading: false,
  error: null,
  products: {},
  // TODO - Acá ya sobra section, cambiaría por productId
  section: 'view',
}

export function ProductReducer(state = initialState, action){
  switch(action.type) {
    // TODO - Acá cambiaria por update_product
    case PRODUCT_SECTION:
      return {
        ...state,
        // TODO - acá cambiaria el estado productId y le meteria lo que llega en el payload
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