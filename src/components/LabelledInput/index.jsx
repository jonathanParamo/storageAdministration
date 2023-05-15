import "./styles.css"

const LabelledInput = ({
  children,
  htmlFor,
  type,
  name,
  id,
  onChange,
  value
}) => {
  return (
    <div className="textContainerLabelledInput">
      <label
        htmlFor={htmlFor}
        className="textCardLabelLabelledInput"
      >
        {children}
      </label>
      <input
        className="inputCardLabelledInput"
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default LabelledInput