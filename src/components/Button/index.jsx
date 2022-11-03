import "./styles.css";

const Button = ({ id, label, onClick, variant, size, color, disabled  }) => {
  return (
    <button
      id={id}
      onClick={disabled ? undefined : onClick}
      className={`general-styles ${color}-${variant} ${size}`}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button;
