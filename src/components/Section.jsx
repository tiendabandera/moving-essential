const Section = ({ classNameParent, className, id, children }) => {
  return (
    <div className={`py-10 ${classNameParent || ""}`}>
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
