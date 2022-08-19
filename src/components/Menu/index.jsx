import { useSelector } from "react-redux"
import "./styles.css"

const Menu = ({ listItems }) => {

  const { section } = useSelector(({ StorageReducer }) => ({
    section: StorageReducer.section,
  }));

  return (
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
    </div>
  )
}

export default Menu