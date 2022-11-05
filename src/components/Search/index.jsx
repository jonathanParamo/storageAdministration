import "./styles.css"

const Search = ({ id, onChange, className, placeholder, value }) => {
  return (
    <input
      id={id}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      value={value}
    />
  )
}

export default Search