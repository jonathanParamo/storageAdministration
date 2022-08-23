import { useDispatch, useSelector } from "react-redux"
// TODO - no necesitaria importar el useSelector, porque no se va a usar.
import { Toaster, toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import "./styles.css"

const ViewProducts = () => {
  // TODO - Falta recibir el prop propducts, que trae todo el obj con data de productos existentes.
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()

  useEffect(() =>{
    if(!token) navigate("/")
    // TODO - los productos llegan de redux, no necesita la func ni traerlos de la api
    dataProducts()
  }, [])

  // TODO - No necesita el use selector para traer productos de redux, porque ya los está recibiendo por los props.
  // const {
  //   products,
  // } = useSelector(({ProductReducer})=> ({
  //   products : ProductReducer.products
  // }))

  const handleDelete = async (_id) => {
    try {
      const {data} = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/storages/destroy',
        data: { _id },
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      toast.success("Storage has delete")
      dispatch({type: "STORAGE_SUCCESS", payload: data })
    } catch (error) {
      toast.error("Error in the creation of the storage")
      dispatch({ type: "STORAGE_ERROR", payload: error })
    }
  }

  // No necesita jalar datos de la api, porque esos datos de los productos ya se trajeron cuando se hizo login-
  const dataProducts = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER,
        // TODO - igual la ruta era products/getAll
        url: '/storages/getAll',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      dispatch({type: "STORAGE_SUCCESS", payload: data.products })
    } catch (error) {
      toast.error("There are no products")
    }
  }

  const products = {
    name: "a",
    amount: 15,
    category: "cafe",
    _id: 122313123
  }

  const hasData = !!products && products.length > 0;

  const editProduct = (id) => {
    // TODO - Sería update_product, ya que es un prodcto lo que quiere actualizar
    dispatch({ type: 'UPDATE_STORAGE', payload: id })
    dispatch({ type: 'CHANGE_SECTION', payload: 'update' })
  }

  return (
    <div className="MainContainer">
      {hasData ? products.map(({ name, amount, category, _id }) => {
        return (
          <div className="card" key={_id}>
            <div className="cardSection">
              <label className="cardLabel">Product:</label>
              <p className="cardText">
                {name}
              </p>
            </div>
            <div className="cardSection">
              <label className="cardLabel">Amount:</label>
              <p className="cardText">{amount}</p>
            </div>
            <div className="cardSection">
              <label className="cardLabel">Category:</label>
              <p className="cardText">{category}</p>
            </div>
            <div className="cardButton">
              <button
                className="editStorage"
                onClick={() => editProduct(_id)}
              >
                Edit product
              </button>
              <button
                className="deleteStorage"
                onClick={() => handleDelete(_id)}
              >
                Delete product
              </button>
            </div>
          </div>
        )
      }) : (
        <Toaster
          position="button-center"
        />
      )}
    </div>
  )
}

export default ViewProducts