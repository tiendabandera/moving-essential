const CustomIcon = ({ icon: Icon, className, onClick }) => {
  return (
    <div
      className={`p-2 bg-slate-400/20 rounded-lg ${className || ""}`}
      onClick={onClick}
    >
      <Icon strokeWidth={1} className="w-4 h-4" />
    </div>
  );
};

export default CustomIcon;
