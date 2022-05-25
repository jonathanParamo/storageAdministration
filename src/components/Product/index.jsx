import "./styles.css"

const Product = ({
    productName,
    productCategory,
    productPrice,
    productAmount,
    image}) => {
  return(
    <div className="product">
      <img>{image}</img>
      <h3
        className="titleProduct">
          {productName}
        </h3>
      <p>{productPrice}</p>
      <p>{productCategory}</p>
      <input type="number">
        {productAmount}
      </input>
    </div>
  )
}

export default Product