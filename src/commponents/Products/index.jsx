import Product from "../Product";

const Products = ({ products, deleteProduct }) => {
  return(
    <section>
      {!!products && products.length > 0 ? products.map(({
        name,
        category,
        price
      }) => {
        return (
          <Product
            name={name}
            category={category}
            price={price}
            deleteProduct={deleteProduct}
          />
        )
      }) : (
        <p>Crea un nuevo producto</p>
      )}
    </section>
  )
}

export default Products