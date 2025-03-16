const Input = ({ id, name, label, type, className, readOnly, value }) => {
  const classes = `flex h-9 w-full rounded-md border border-slate-200 
  px-3 py-1 text-base shadow-xs transition-colors 
  file:border-0 file:bg-transparent file:text-sm file:font-medium 
  file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-hidden 
  focus-visible:ring-1 focus-visible:ring-slate-950 
  disabled:cursor-not-allowed 
   md:text-sm ${className || ""} `;
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name} // Identificador del campo
        type={type ?? "text"}
        className={classes}
        disabled={readOnly}
        defaultValue={value}
      />
    </div>
  );
};

export default Input;
