import { useAuth } from "@/context/AuthContext";
import MyLeadsTable from "./components/MyLeadsTable";
import { useEffect, useState } from "react";

const MyLeadsPage = () => {
  //const { userInfo } = useOutletContext();
  const { createCompanyInstance } = useAuth();
  const company = createCompanyInstance({});

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const leads = await company.getAllLeads();
      setLeads(leads.data);
    };

    fetchLeads();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4 font-normal">My leads</h2>
      <div>
        <MyLeadsTable leads={leads} />
      </div>
    </div>
  );
};

export default MyLeadsPage;
