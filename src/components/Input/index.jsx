import "./styles.css"

const Input = ({
  onChange,
  type,
  value,
  placeholder,
  id,
  name,
  autoComplete,
  }) => {
  return (
    <input
      className="inputStyless"
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      id={id}
      name={name}
      autoComplete={autoComplete}
    />
  )
}

export default Input