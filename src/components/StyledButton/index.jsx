import './styles.css';

const StyledButton = ({
  label,
  onClick,
  variant="primary"
  }) => {

  const buttonClassName = `button ${variant}`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {label}
    </button>
  );
};

export default StyledButton;
