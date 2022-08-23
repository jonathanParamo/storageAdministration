import { useDispatch, useSelector } from "react-redux"
import { Toaster, toast } from "react-hot-toast"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../Loader"
import "./styles.css"


const NewProduct = () => {
  const noImage = "https://t4.ftcdn.net/jpg/04/00/24/31/240_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"
  const [image, setImage] = useState("")
  const [validation, setValidation] = useState("")
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const [destiny, setDestiny] = useState("")
  const [count, setCount] =  useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() =>{
    if(!token) navigate("/")
    dataStorages()
  }, [])

  const {
    error,
    storages,
  } = useSelector(({StorageReducer, ProductReducer})=> ({
    error: StorageReducer.error,
    storages : ProductReducer.storages
  }))

  const dataStorages = async () => {
    const {data} = await axios({
      method: 'GET',
      baseURL: process.env.REACT_APP_SERVER,
      url: '/storages/getAll',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    dispatch({type: "STORAGE_SUCCESS", payload: data.storages })
  }

  const validationData = () => {
    setLoading(true)
    if(!count) {
      setValidation("Amount is reuired")
      setLoading(false)
      toast.error("Error in the added in the storage")
      return false
    }
    if(!storages) {
      setValidation("must be assigned to a storage")
      setLoading(false)
      return false
    }
    setValidation('')
    return true
  }

  const handleSubmit = async () => {
    if(validationData()) {
      try {
        toast.success("The product was added")
        setLoading(false)
      } catch (error) {
        toast.error("Error in the added in the storage")
        dispatch({ type: "STORAGE_ERROR", payload: error })
        setLoading(false)
      }
    }
  }

  return (
    <div className="cardNewProduct">
        <p className="productImage">Product image</p>
      <div>
        <img className="imageNewProduct" src={image || noImage} />
      </div>
        <input
          className="inputImageProduct"
          type="text"
          placeholder="Add link image"
          onSubmit={e => setImage(e.target.value)}
        />
      <div className="amountProduct">
        <p className="unitsAvailable">Units available:</p>
        <div className="containerAmount">
          <button
            className="buttonCountMas"
            onClick={() => {
              setCount(count >= 20 ? count : count + 1)}}>
            +
          </button>
          <p className="unids">{count} unids</p>
          <button
            className="buttonCountMenos"
            onClick={() => {
              setCount(count <= 1 ? count : count - 1)}}>
            -
          </button>
        </div>
      </div>
      <div className="containerSelectStorage">
        <p className="selectStorage">Add to storage:</p>
        <select
          className="selectOptionsStorage"
          value={destiny}
          onChange={(e) => setDestiny(e.target.value)}>
          {!!storages && storages.length > 0 ? storages.map(({ name }) => {
            return (
              <option
                value={name}>
                  {name}
              </option>
            )
          }) : (
            <option>No existen bodegas</option>
          )}
        </select>
      </div>
      {!loading ?
        <button
          className="addNewProduct"
          onClick={handleSubmit}
        >
          Add product
        </button> : <Loader />
      }
      <Toaster
        position="button-right"
        duration="3000"
      />
      {validation && <p>{validation}</p>}
      {error && <p>Algo salio mal.</p>}
    </div>
  )
}

export default NewProduct