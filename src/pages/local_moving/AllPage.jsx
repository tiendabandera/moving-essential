import RepeaterCompanies from "@/components/RepeaterCompanies";
import { useSearchParams } from "react-router-dom";

const AllPage = () => {
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  return (
    <div className="max-container padding-container py-10">
      <RepeaterCompanies filterSection filterQueryParams={paramsObject} />
    </div>
  );
};

export default AllPage;
