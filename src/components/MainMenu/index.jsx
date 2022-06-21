import { useNavigate } from "react-router-dom"
import LogOut from "../LogOut"
import "./styles.css"

const MainMenu = () => {
  const navigate = useNavigate()

  return (

  <div className="containerMainMenu">
    <div className="logoMainMenu">
      Logo
    </div>
    <input
      className="searchMainMenu"
      placeholder="Search"
      type="search"
      name="search"
    />
    <div className="containerButtonsMainMenu">
      <button
        className="butonsMainMenu"
        onClick={() => navigate('/createNewProduct')}
      >
        Create a product
      </button>
      <button
        className="butonsMainMenu"
        onClick={() => navigate('/myproducts')}
      >
        My products
      </button>
      <button
        className="butonsMainMenu"
        onClick={() => navigate('/myProfile')}
      >
        My profile
      </button>
    </div>
    <LogOut />
  </div>
  )
}

export default MainMenu