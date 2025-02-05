const Section = ({ className, id, customPaddings, children }) => {
  return (
    <div
      id={id}
      className={`       
      ${customPaddings || `px-6 py-10 xl:px-36 lg:py-18 xl:py-10`} 
      ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Section;
