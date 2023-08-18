import { useSelector } from "react-redux"
import useResponsive from '../../helpers/useResponsive'
import "./styles.css"

const Menu = ({ listItems }) => {
  const { width } = useResponsive();
  const isMobile = width <= 720;

  const { section } = useSelector(({ MenuReducer }) => ({
    section: MenuReducer.section,
  }));

  return (
    <>
    {!isMobile ?

      <div className="containerProducMenu">
        <h2 className="titleProducts">Menú</h2>
        {Object.values(listItems)?.map(({ label, onClick, currentSection}) => {
          return (
            <button
              key={label}
              className={`btnProducts ${currentSection === section && 'selected'}`}
              onClick={onClick}
            >
              {label}
            </button>
          )
          })
        })
      </div> : ""
    }
  </>
  )
}

export default Menu