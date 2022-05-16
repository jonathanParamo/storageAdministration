import NewProduct from "../NewProduct"

const Product = ({
    productName,
    productCategory,
    productPrice,
    productAmount,
    image}) => {
  return(
    <article>
      <img>{image}</img>
      <h2>{productName}</h2>
      <p>{productPrice}</p>
      <p>{productCategory}</p>
      <input type="number">
        {productAmount}
      </input>
      <button onclick={deleteProduct}>
        Eliminar producto
      </button>
    </article>
  )
}

export default Product