import "./styles.css"

const LabelledInput = ({
  label,
  type="text",
  name,
  id,
  onChange,
  value
}) => {
  return (
    <div className="textContainerLabelledInput">
      <label
        htmlFor={id}
        className="textCardLabelLabelledInput"
      >
        {label}
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