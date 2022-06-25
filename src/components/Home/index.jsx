import MainMenu from "../MainMenu"
import ProductMenu from "../ProductMenu"

const Home = () => {

  return (
    <div className="containerDashboard">
      <MainMenu />
      <div className="containerProductMenuProducts">
        <ProductMenu />
      </div>
    </div>
  )
}

export default Home