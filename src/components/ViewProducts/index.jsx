import { getProducts } from "../../Store/ProductReducer"
import { useDispatch, useSelector } from "react-redux"
import { Toaster, toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import "./styles.css"
import { getStorages } from "../../Store/StorageReducer"

const ViewProducts = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() =>{
    if(!token) navigate("/")
    dispatch(getProducts())
    dispatch(getStorages())
  }, [])

  const {
    products,
    storages,
  } = useSelector(({ ProductReducer, StorageReducer }) => ({
    products: ProductReducer.products,
    storages: StorageReducer.storages,
  }));

  const confirmDelete = (_id) => {
    const confirm = window.confirm("Are you sure you want to delete the product?")
    if(confirm) {
      handleDelete(_id)
    }
  }

  const handleDelete = async (_id) => {
    try {
      const {data} = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/products/destroy',
        data: { _id },
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      toast.success("Product has delete")
      dispatch({type: "PRODUCT_SUCCESS", payload: data })
    } catch (error) {
      toast.error("Error in delete of the product")
      dispatch({ type: "PRODUCT_ERROR", payload: error })
    }
  }

  const hasData = !!products && products.length > 0;

  const editProduct = (id) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: id })
    dispatch({ type: 'CHANGE_SECTION', payload: 'update' })
  }

  const storageName = (storageId) => {
    const [{ name }] = storages.filter(({ _id }) => (_id === storageId))
    return name
  }

  return (
    <div className="MainContainer">
      {hasData ? products.map(({ image, name, amount, storageId, _id}) => {
        return (
          <div className="cardProducts" key={_id}>
            <div className="containerImageProduct">
              <img className="imageProduct" src={image} alt="product ilustration" />
            </div>
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
              <label className="cardLabel">Storage:</label>
              <p className="cardText">{storageName(storageId)}</p>
            </div>
            <div className="cardProductButton">
              <button
                className="editProduct"
                onClick={() => editProduct(_id)}
                children="Edit Product"
              />
              <button
                className="deleteProduct"
                onClick={() => confirmDelete(_id)}
              >
                Delete product
              </button>
            </div>
          </div>
        )
      }) : (
        <>
          <Toaster
            position="button-center"
            />
        </>
      )}
    </div>
  )
}

export default ViewProducts