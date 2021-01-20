import zacs from "@nozbe/zacs";
import style from "./style.module.css";

const StyledButton = zacs.styled("button", style.button);

const Button = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
