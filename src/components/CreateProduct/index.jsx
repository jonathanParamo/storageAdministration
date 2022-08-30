import { useDispatch, useSelector } from "react-redux"
import { Toaster, toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../Loader"
import axios from "axios"
import "./styles.css"


const CreateProduct = () => {
  const noImage = "https://t4.ftcdn.net/jpg/04/00/24/31/240_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"
  const [image, setImage] = useState("")
  const [validation, setValidation] = useState("")
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const [destiny, setDestiny] = useState("")
  const [amount, setAmount] =  useState(0)
  const [name, setName] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() =>{
    if(!token) navigate("/")
    dataStorages()
  }, [])

  const {
    error,
    storages,
  } = useSelector(({StorageReducer})=> ({
    error: StorageReducer.error,
    storages : StorageReducer.storages
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
    if(!storages) {
      setValidation("must be assigned to a storage")
      setLoading(false)
      return false
    }
    setValidation('')
    return true
  }

  const handleCreate = async (_id) => {
    if(validationData()) {
      try {
        const { data } = await axios ({
          method: 'POST',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/products/create',
          data: { name, amount, image, storageId: _id },
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
        dispatch({type: "PRODUCT_SUCCESS", payload: data})
        toast.success("The product was added")
        setLoading(false)
      } catch (error) {
        toast.error("Error in the added product")
        dispatch({ type: "STORAGE_ERROR", payload: error })
        setLoading(false)
      }
    }
  }

  return (
    <div className="cardNewProduct">
        <h3 className="titleProduct">Create Product</h3>
        <div className="productTitle">
          <label
            htmlFor="productName"
            className="productName"
            >
              Product name:
          </label>
          <input
            id="productName"
            className="labelProductName"
            type="text"
            placeholder="Product name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <p className="productImage">Product image:</p>
      <div>
        <img className="imageNewProduct" src={image || noImage} />
      </div>
        <input
          className="inputImageProduct"
          type="text"
          placeholder="Add link image"
          onChange={e => setImage(e.target.value)}
        />
      <div className="amountProduct">
        <p className="unitsAvailable">Units available:</p>
        <div className="containerAmount">
          <button
            className="buttonCountMas"
            onClick={() => {
              setAmount(amount >= 20 ? amount : amount + 1)}}>
            +
          </button>
          <p className="unids">{amount} unids:</p>
          <button
            className="buttonCountMenos"
            onClick={() => {
              setAmount(amount <= 1 ? amount : amount - 1)}}>
            -
          </button>
        </div>
      </div>
      <div className="containerSelectStorage">
        <p className="selectStorage">Add to storage:</p>
        <select
          className="selectOptionsStorage"
          value={destiny}
          onChange={(e) => setDestiny(e.target.value)}
        >
          <option>Choose on storage ...</option>
          {!!storages && storages.length > 0 ? storages.map(({ name, _id }) => {
            return (
              <option
                key={_id}
                value={_id}
              >
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
          onClick={() => handleCreate(destiny)}
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

export default CreateProduct