import { useDispatch, useSelector } from "react-redux"
import { Toaster, toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../Loader"
import axios from "axios"
import "./styles.css"


const CreateProduct = ({ editMode, productId }) => {
  const noImage = "https://t4.ftcdn.net/jpg/04/00/24/31/" +
    "240_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"
  const [image, setImage] = useState("")
  const [validation, setValidation] = useState("")
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const [destiny, setDestiny] = useState("")
  const [amount, setAmount] =  useState(0)
  const [name, setName] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    error,
    storages,
    products
  } = useSelector(({StorageReducer, ProductReducer})=> ({
    error: StorageReducer.error,
    storages : StorageReducer.storages,
    products: ProductReducer.products
  }))

  useEffect(() =>{
    if(!token) navigate("/")
    if(editMode) getProduct()
  }, [])

  const validationAmount = () => {
    if (amount > 100) {
      setAmount(100)
    }
    if(amount < 0) {
      setAmount(0)
    }
  }

  const productAmount = (destiny) => {
    const product = products.filter(({storageId})  => destiny === storageId )
    const cantidad = product.map(products => {
      return products.amount
    })
    const allAmount2 = [...cantidad]

    return allAmount2.reduce((a,b)=> a+b,0)
  }

  const storageAmount = () => {
    const count = storages.map(storage => {
      return storage.amount
    })
    let allAmount = [...count]

    return allAmount.reduce((a,b)=> a+b,0)
  }

  const validationData = () => {
    setLoading(true)
    if(!productAmount > storageAmount) {
      setValidation("Amount invalid")
      setLoading(false)
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

  const getProduct = () => {
    const product = products?.filter(({ _id }) => productId === _id );
    setImage(product[0].image)
    setName(product[0].name)
    setAmount(product[0].amount)
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
        dispatch({ type: "PRODUCT_ERROR", payload: error })
        setLoading(false)
      }
    }
  }

  const handleEdit = async () => {
    if(validationData()) {
      try {
        const {data} = await axios({
          method: 'PUT',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/products/update',
          data: { image, name, amount, _id: productId },
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
        toast.success("Product successfully updated")
        dispatch({type: "PRODUCT_SUCCESS", payload: data })
        setLoading(false)
      } catch (error) {
        toast.error("Error in the edit of the product")
        dispatch({ type: "PRODUCT_ERROR", payload: error })
        setLoading(false)
      }
    }
  }

  const onCancel = () => {
    dispatch({ type: 'CANCEL_UPDATE' })
    dispatch({ type: 'CHANGE_SECTION', payload: 'view' })
  }

  return (
    <div className="cardNewProduct">
        <h3 className="titleProduct">{editMode ? 'Edit product' : 'Create Product'}</h3>
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
              setAmount(amount >= 100 ? amount : amount + 1)}}>
            +
          </button>
          <input
            type="number"
            className="unids"
            value={amount}
            onChange={e => {
              validationAmount()
              setAmount(e.target.value)
            }}
            />
          <button
            className="buttonCountMenos"
            onClick={() => {
              setAmount(amount <= 0 ? amount : amount - 1)}}>
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
                onClick={productAmount(destiny)}
              >
                {name}
              </option>
            )
          }) : (
            <option>There are no products</option>
          )}
        </select>
      </div>
      {!loading ?
        <button
          className="addNewProduct"
          onClick={editMode ? handleEdit : () => handleCreate(destiny)}
        >
          {editMode ? 'Update' : 'Add product'}
        </button> : <Loader />
      }
      {editMode && (
        <>
          <button
            className='createProduct'
            onClick={onCancel}
            >
            Cancel
          </button>
          <>{productAmount(destiny)}</>
        </>
      )}
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