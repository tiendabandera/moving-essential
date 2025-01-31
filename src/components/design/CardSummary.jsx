import CustomToolTips from "../../components/CustomTooltips";
import CustomIcon from "./CustomIcon";

const CardSummary = ({ icon, total, avarage, title, tooltipText }) => {
  return (
    <div className="shadow-sm bg-background rounded-lg p-5 py-3 hover:shadow-lg transition">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <CustomIcon icon={icon} />
          {title}
        </div>
        <CustomToolTips content={tooltipText} />
      </div>
      <div className="flex gap-4 mt-2 md:mt-4">
        <p className="text-2xl font-medium">{total}</p>
      </div>
    </div>
  );
};

export default CardSummary;
