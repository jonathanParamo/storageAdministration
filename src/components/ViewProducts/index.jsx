import { useDispatch, useSelector } from "react-redux"
import { Toaster, toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import "./styles.css"

const ViewProducts = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()

  useEffect(() =>{
    if(!token) navigate("/")
    dataProducts()
  }, [])

  const {
    products,
  } = useSelector(({StorageReducer})=> ({
    products : StorageReducer.storages.products
  }))

  const handleDelete = async (_id) => {
    try {
      const {data} = await axios({
        method: 'PuT',
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

  const dataProducts = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/storages/getAll',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      dispatch({type: "STORAGE_SUCCESS", payload: data.storages.products })
    } catch (error) {
      toast.error("There are no storages")
    }
  }

  const hasData = !!products && products.length > 0;

  const editStorage = (id) => {
    dispatch({ type: 'UPDATE_STORAGE', payload: id })
  }

  return (
    <div className="MainContainer">
      {hasData ? products.map(({ name, amount, category, _id }) => {
        return (
          <div className="card">
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
                onClick={() => editStorage(_id)}
              >
                Edit storage
              </button>
              <button
                className="deleteStorage"
                onClick={() => handleDelete(_id)}
              >
                Delete storage
              </button>
            </div>
          </div>
        )
      }) : (
        <Toaster
          position="button-center"
        />
        // <p>No existen bodegas</p>
      )}
    </div>
  )
}

export default ViewProducts