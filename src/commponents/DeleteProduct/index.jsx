const DeleteProdutc = _id => e => {
  setState({
    products: products.filter((el, i, arr) => {
      return _id !== el-_id
    })
  })
}

export default DeleteProdutc