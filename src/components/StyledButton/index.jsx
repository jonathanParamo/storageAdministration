import './styles.css';

const StyledButton = ({ label, onClick, style }) => {
  let buttonClassName = "button";

  if (style === "primary") {
    buttonClassName += " primaryButton";
  } else if (style === "secondary") {
    buttonClassName += " secondaryButton";
  } else if (style === "third"){
    buttonClassName += " thirdButton";
  }

  return (
    <button className={buttonClassName} onClick={onClick}>
      {label}
    </button>
  );
};

export default StyledButton;
