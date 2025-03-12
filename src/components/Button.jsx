import { Link } from "react-router-dom";
import ButtonSvg from "../assets/svg/ButtonSvg";
import ButtonSvg2 from "../assets/svg/ButtonSvg2";

const Button = ({
  className,
  href,
  onClick,
  children,
  px,
  white,
  orange,
  disabled,
}) => {
  const classes = `cursor-pointer button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-color-1" : "text-n-1"}  ${className || ""}`;

  const spanClasses = `relative z-10 flex items-center gap-2`;

  const renderButton = () => (
    <button className={classes} onClick={onClick} disabled={disabled}>
      <span className={spanClasses}>{children}</span>
      {white ? ButtonSvg(white) : ButtonSvg2(orange)}
    </button>
  );

  const renderLink = () => (
    <Link className={classes} to={href}>
      <span className={spanClasses}>{children}</span>
      {white ? ButtonSvg(white) : ButtonSvg2(orange)}
    </Link>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
