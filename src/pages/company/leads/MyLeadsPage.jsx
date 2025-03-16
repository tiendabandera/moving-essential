import { useAuth } from "@/context/AuthContext";
import MyLeadsTable from "./components/MyLeadsTable";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MyLeadsPage = () => {
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  const { createCompanyInstance } = useAuth();
  const company = createCompanyInstance({});

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      if (paramsObject.id) {
        const leads = await company.getLeadsByField("id", paramsObject.id);
        setLeads(leads.data);
        return;
      }

      const leads = await company.getAllLeads();
      setLeads(leads.data);
      return;
    };

    fetchLeads();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">My leads</h2>
      <div className="shadow-xs bg-background rounded-lg p-5">
        <MyLeadsTable leads={leads} />
      </div>
    </div>
  );
};

export default MyLeadsPage;
