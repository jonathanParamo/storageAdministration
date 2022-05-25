import "./styles.css"

const Button = ({ children, handleClick }) => {
  return(
    <>
      <button
        className="componentButton"
        onClick={handleClick}
      >
        {children}
      </button>
    </>
  )
}

export default Button