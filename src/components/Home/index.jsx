import { useNavigate } from "react-router-dom"
import Button from "../Button"
import Product from "../Product"
import "./styles.css"

const Home = () => {
  const navigate = useNavigate()

  const materiales = () => {
    navigate('/electrodomesticos')
  }

  const electrodomesticos = () => {
    navigate('/electrodomesticos')
  }

  const alimentos = () => {
    navigate('/electrodomesticos')
  }


  return(
    <div className="containerHome">
      <div className="menuHome">
        <div className="logoHome">
          Logo
        </div>
        <div className="menuOpcionesHome">
          <input
            className="searchHome"
            placeholder="search"
            type="search"
            name="search"
          />
          <div className="containerButtonsHome">
            <button
              className="buttonHomeMenu"
              onClick={() => navigate('/createNewProduct')}
            >
              Create a product
            </button>
            <button
              className="buttonHomeMenu"
              onClick={() => navigate('/myproducts')}
            >
              My products
            </button>
            <button
              className="buttonHomeMenu"
              onClick={() => navigate('/myProfile')}
            >
              My profile
            </button>
          </div>
        </div>
      </div>
      <div className="divcentral">
        <div className="categories">
          <h3 className="title">Categories</h3>
          <div className="buttonCategory">
            <Button
              handleClick={() =>  electrodomesticos()}
              children={"Electrodomesticos"}
              value={electrodomesticos}
            />
          </div>
          <div className="buttonCategory">
            <Button
              handleClick={() => materiales()}
              children={"Materiales de construccion"}
              value={materiales}
            />
          </div>
          <div className="buttonCategory">
            <Button
              handleClick={() => alimentos()}
              children={"Alimentos"}
              value={alimentos}
            />
          </div>
        </div>
        <div className="cards">
          <p className="titleProducts">Electrodomesticos</p>
          <div className="electrodomesticos">
            {electrodomesticos <= 2}<Product
              productName={"Arroz"}
              productPrice={1800}
              productCategory={alimentos}
              className="product"/>
            <p className="redirection"
              onClick={() => navigate('/electrodomesticos')}>
                Mas
            </p>
          </div>
          <p className="titleProducts">Alimentos</p>
          <div className="alimentos">
            {alimentos <= 2}<Product className="product"/>
            <p className="redirection"
              onClick={() => navigate('/alimentos')}>Mas</p>
          </div>
          <p className="titleProducts">Materiales construccion</p>
          <div className="materiales">
            {materiales <= 2 }<Product className="product"/>
            <p className="redirection"
              onClick={() => navigate('/materiales')}>Mas</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home