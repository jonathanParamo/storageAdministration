import { getProducts } from "../../Store/ProductReducer"
import { useDispatch, useSelector } from "react-redux"
import { Toaster, toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import "./styles.css"
import { getStorages } from "../../Store/StorageReducer"
import Loader from "../../components/Loader"
import ProductCard from "../../components/ProductCard"

const ViewProducts = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    products = [],
    storages = [],
  } = useSelector(({ ProductReducer, StorageReducer }) => ({
    products: ProductReducer.products,
    storages: StorageReducer.storages,
  }))

  useEffect(() =>{
    if(!token) navigate("/")
    dispatch(getProducts(token))
    dispatch(getStorages(token))
  }, [])

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
      toast.error("Error deleting the product")
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

  if (!storages.length) return (
    <Loader />
  );

  return (
    <div className="MainContainer">
      {hasData ? products.map(({ image, name, amount, storageId, _id}) => {
        return (
          <ProductCard
            key={_id}
            image={image}
            name={name}
            amount={amount}
            storageId={storageName(storageId)}
            editProduct={() => editProduct(_id)}
            deleteProduct={() => confirmDelete(_id)}
          />
        )
      }) :
        <p className="noProducts">At this time there are no products</p>
      }
      <Toaster
        position="button-center"
      />
    </div>
  )
}

export default ViewProducts