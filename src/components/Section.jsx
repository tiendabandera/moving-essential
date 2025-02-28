const Section = ({
  classNameParent,
  className,
  id,
  children,
  customPadding,
}) => {
  return (
    <div
      className={`${customPadding || "py-10 lg:py-16"} ${
        classNameParent || ""
      }`}
    >
      <section
        id={id}
        className={`    
      max-container padding-container flex flex-col         
      ${className || ""}`}
      >
        {children}
      </section>
    </div>
  );
};

export default Section;
