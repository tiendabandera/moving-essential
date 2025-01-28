import ButtonSvg from "../assets/svg/ButtonSvg";
import ButtonSvg2 from "../assets/svg/ButtonSvg2";

const Button = ({ className, href, onClick, children, px, white, orange }) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-color-1" : "text-n-1"}  ${className || ""}`;

  const spanClasses = `relative z-10`;

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
      {white ? ButtonSvg(white) : ButtonSvg2(orange)}
    </button>
  );

  const renderLink = () => (
    <a href={href} className={classes}>
      <span className={spanClasses}>{children}</span>
      {white ? ButtonSvg(white) : ButtonSvg2(orange)}
    </a>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
